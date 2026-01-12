'use client';

import { useState, useRef } from 'react';
import { Form, Input, Textarea, Button } from '@heroui/react';
import { title } from "@/components/primitives";

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
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      setSubmitted(true);
      if (formRef.current) {
        formRef.current.reset();
      }
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className={title()}>Contact Us</h1>
        <p className="text-gray-600 mt-2 mb-8">Get in touch with us. We'd love to hear from you.</p>

        <Form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            isRequired
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            name="name"
          />

          <Input
            isRequired
            label="Email"
            placeholder="Enter your email address"
            type="email"
            name="email"
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number (optional)"
            type="tel"
            name="phone"
          />

          <Input
            label="Subject"
            placeholder="What is this about?"
            type="text"
            name="subject"
          />

          <Textarea
            isRequired
            label="Message"
            placeholder="Enter your message"
            name="message"
            minRows={5}
          />

          <Button
            type="submit"
            color="danger"
            className="w-full"
            isLoading={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>

          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Thank you! Your message has been sent successfully.
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
