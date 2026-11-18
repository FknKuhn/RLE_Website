'use client';

import { useState, useRef } from 'react';
import { Form, Input, Textarea, Button } from '@heroui/react';
import NextLink from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      website: formData.get('website'), // honeypot
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      setSubmitted(true);
      if (formRef.current) formRef.current.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 flex flex-col items-center">

      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-2">Contact Us</h1>
      <p className="text-center text-foreground/80 mb-8">
        Get in touch with us. We&apos;d love to hear from you.
      </p>

      {/* Contact info bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full max-w-2xl">
        <div className="flex-1 text-center bg-[var(--bg-light)] rounded-xl py-4 px-3 border-t-[3px] border-danger">
          <p className="text-xs text-foreground/75 uppercase tracking-widest mb-1">Address</p>
          <p className="text-sm font-medium">R-457 N. Main St., Moscow, PA</p>
        </div>
        <div className="flex-1 text-center bg-[var(--bg-light)] rounded-xl py-4 px-3 border-t-[3px] border-danger">
          <p className="text-xs text-foreground/75 uppercase tracking-widest mb-1">Phone</p>
          <p className="text-sm font-medium"><a className="underline underline-offset-2" href="tel:+15708424051">(570) 842-4051</a></p>
        </div>
        <div className="flex-1 text-center bg-[var(--bg-light)] rounded-xl py-4 px-3 border-t-[3px] border-danger">
          <p className="text-xs text-foreground/75 uppercase tracking-widest mb-1">Fax</p>
          <p className="text-sm font-medium">(570) 842-4052</p>
        </div>
      </div>

      {/* Form */}
      <Form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
        <Input
          isRequired
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
          name="name"
          autoComplete="name"
          maxLength={100}
        />
        <Input
          isRequired
          label="Email"
          placeholder="Enter your email address"
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
        />
        <Input
          label="Phone Number"
          placeholder="Optional"
          type="tel"
          name="phone"
          autoComplete="tel"
          maxLength={30}
        />
        <Input
          label="Subject"
          placeholder="What is this about?"
          type="text"
          name="subject"
          maxLength={150}
        />
        <Textarea
          isRequired
          label="Message"
          placeholder="Enter your message"
          name="message"
          maxLength={5000}
          minRows={6}
        />

        {/* Spam trap: hidden from people and screen readers, but bots fill it in */}
        <div aria-hidden="true" className="absolute -left-[10000px] w-px h-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Button
          type="submit"
          color="danger"
          className="w-full font-semibold"
          isLoading={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>

        <p className="text-xs text-foreground/80 text-center">
          We use the information you send only to respond to you. See our{' '}
          <NextLink className="underline underline-offset-2" href="/privacy">
            Privacy Policy
          </NextLink>
          .
        </p>

        {/* Live regions so screen readers announce the result of submitting */}
        <div role="status" aria-live="polite">
          {submitted && (
          <div className="bg-[var(--bg-light)] border-2 border-[var(--success)] text-foreground px-4 py-3 rounded-lg text-sm text-center">
            Thank you! Your message has been sent successfully.
          </div>
          )}
        </div>

        <div role="alert">
          {error && (
          <div className="bg-[var(--bg-light)] border border-danger text-danger px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
          )}
        </div>
      </Form>

    </div>
  );
}
