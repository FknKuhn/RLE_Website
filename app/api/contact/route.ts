import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

import { siteConfig } from '@/config/site';
import {
  getClientIp,
  rateLimitAll,
  tooManyRequests,
  type RateLimitRule,
} from '@/lib/rate-limit';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Per visitor (IP address)
const ipRules: RateLimitRule[] = [
  { name: 'contact-ip-burst', limit: 3, windowMs: 10 * MINUTE },
  { name: 'contact-ip-daily', limit: 10, windowMs: DAY },
];
// Per email address, so nobody can use the confirmation email to flood a stranger's inbox
const recipientRules: RateLimitRule[] = [
  { name: 'contact-recipient-daily', limit: 3, windowMs: DAY },
];
// Whole site: each submission sends 2 emails, and Gmail allows ~500 per day
const globalRules: RateLimitRule[] = [
  { name: 'contact-global-hourly', limit: 30, windowMs: HOUR },
  { name: 'contact-global-daily', limit: 100, windowMs: DAY },
];

const MAX_BODY_BYTES = 20_000;
const LIMITS = { name: 100, email: 254, phone: 30, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[0-9+().\-\s x]*$/i;

// Everything a visitor types is escaped before it goes into the email HTML
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Header values (subject) must be single-line
const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

const field = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const badRequest = (error: string) => NextResponse.json({ error }, { status: 400 });

export async function POST(request: NextRequest) {
  try {
    // Reject oversized payloads before parsing
    const declaredLength = Number(request.headers.get('content-length') ?? 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
    }
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return badRequest('Invalid request.');
    }

    // Honeypot: real visitors never see or fill this field; bots usually do.
    // Pretend it worked so the bot doesn't learn to avoid it.
    if (field(body.website)) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    }

    const ip = getClientIp(request);
    const ipCheck = rateLimitAll(ipRules, ip);
    if (!ipCheck.ok) return tooManyRequests(ipCheck.retryAfter);

    const name = field(body.name);
    const email = field(body.email).toLowerCase();
    const phone = field(body.phone);
    const subject = singleLine(field(body.subject));
    const message = field(body.message);

    // Validate required fields
    if (!name || !email || !message) {
      return badRequest('Missing required fields');
    }
    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      phone.length > LIMITS.phone ||
      subject.length > LIMITS.subject ||
      message.length > LIMITS.message
    ) {
      return badRequest('One or more fields are too long.');
    }
    if (!EMAIL_RE.test(email)) {
      return badRequest('Please enter a valid email address.');
    }
    if (phone && !PHONE_RE.test(phone)) {
      return badRequest('Please enter a valid phone number.');
    }

    const recipientCheck = rateLimitAll(recipientRules, email);
    if (!recipientCheck.ok) {
      return tooManyRequests(
        recipientCheck.retryAfter,
        'We have already received several messages from this email address today. Please call us at (570) 842-4051.',
      );
    }

    const globalCheck = rateLimitAll(globalRules, 'all');
    if (!globalCheck.ok) {
      console.warn('Contact form global limit reached');
      return tooManyRequests(
        globalCheck.retryAfter,
        'Our contact form is busy right now. Please call us at (570) 842-4051.',
      );
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      subject: escapeHtml(subject || 'No Subject'),
      message: escapeHtml(message),
    };

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_TO_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626 0%, #000000 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .field-label { font-weight: 600; color: #dc2626; margin-bottom: 5px; }
              .field-value { padding: 10px; background: white; border-left: 4px solid #dc2626; padding-left: 15px; }
              .message-box { background: white; padding: 15px; border-left: 4px solid #dc2626; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">👤 Name</div>
                  <div class="field-value">${safe.name}</div>
                </div>
                <div class="field">
                  <div class="field-label">📧 Email</div>
                  <div class="field-value"><a href="mailto:${safe.email}">${safe.email}</a></div>
                </div>
                ${safe.phone ? `
                <div class="field">
                  <div class="field-label">📱 Phone</div>
                  <div class="field-value"><a href="tel:${safe.phone.replace(/[^0-9+]/g, '')}">${safe.phone}</a></div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="field-label">📝 Subject</div>
                  <div class="field-value">${safe.subject}</div>
                </div>
                <div class="field">
                  <div class="field-label">💬 Message</div>
                  <div class="message-box">${safe.message}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the RLE Enterprises contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We received your message - RLE Enterprises',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626 0%, #000000 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .logo { font-size: 48px; margin-bottom: 10px; }
              .content { background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 8px 8px; }
              .greeting { font-size: 16px; margin-bottom: 20px; }
              .field { margin-bottom: 15px; }
              .field-label { font-weight: 600; color: #dc2626; margin-bottom: 5px; }
              .field-value { padding: 10px; background: white; border-left: 4px solid #dc2626; padding-left: 15px; }
              .message-box { background: white; padding: 15px; border-left: 4px solid #dc2626; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
              .cta { background: #dc2626; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; display: inline-block; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🚀</div>
                <h1>Thank You for Contacting Us</h1>
              </div>
              <div class="content">
                <p class="greeting">Hi ${safe.name},</p>
                <p>We have received your message and appreciate you reaching out to RLE Enterprises. Our team will review your inquiry and get back to you as soon as possible.</p>

                <h3 style="color: #dc2626; margin-top: 25px;">Your Message Summary:</h3>

                <div class="field">
                  <div class="field-label">📝 Subject</div>
                  <div class="field-value">${safe.subject}</div>
                </div>

                <div class="field">
                  <div class="field-label">💬 Message</div>
                  <div class="message-box">${safe.message}</div>
                </div>

                <p style="margin-top: 25px;">We typically respond to inquiries within 24-48 hours during business days.</p>

                <div style="text-align: center;">
                  <a href="${siteConfig.url}" class="cta">Visit Our Website</a>
                </div>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} RLE Enterprises. All rights reserved.</p>
                <p>This is an automated email. Please do not reply directly to this message.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
