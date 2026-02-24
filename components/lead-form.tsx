'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export function LeadForm({ providerId, type = 'availability' }: { providerId?: string; type?: 'availability' | 'claim' }) {
  const [status, setStatus] = useState('');

  return (
    <form
      className="space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData.entries()))
        });
        setStatus(res.ok ? 'Submitted successfully.' : 'Submission failed.');
      }}
    >
      <input type="hidden" name="providerId" value={providerId ?? ''} />
      <input type="hidden" name="type" value={type} />
      <Input name="name" required placeholder="Your name" />
      <Input name="email" type="email" placeholder="Email" />
      <Input name="phone" placeholder="Phone" />
      <Textarea name="message" required placeholder="Message" />
      <Button type="submit">Submit</Button>
      {status ? <p className="text-sm">{status}</p> : null}
    </form>
  );
}
