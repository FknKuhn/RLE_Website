import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">📧 Email</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="field-label">📱 Phone</div>
                  <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="field-label">📝 Subject</div>
                  <div class="field-value">${subject || 'No Subject'}</div>
                </div>
                <div class="field">
                  <div class="field-label">💬 Message</div>
                  <div class="message-box">${message}</div>
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
                <p class="greeting">Hi ${name},</p>
                <p>We have received your message and appreciate you reaching out to RLE Enterprises. Our team will review your inquiry and get back to you as soon as possible.</p>
                
                <h3 style="color: #dc2626; margin-top: 25px;">Your Message Summary:</h3>
                
                <div class="field">
                  <div class="field-label">📝 Subject</div>
                  <div class="field-value">${subject || 'No Subject'}</div>
                </div>
                
                <div class="field">
                  <div class="field-label">💬 Message</div>
                  <div class="message-box">${message}</div>
                </div>
                
                <p style="margin-top: 25px;">We typically respond to inquiries within 24-48 hours during business days.</p>
                
                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://rleenterprises.com'}" class="cta">Visit Our Website</a>
                </div>
              </div>
              <div class="footer">
                <p>© 2024 RLE Enterprises. All rights reserved.</p>
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
