'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const [status, setStatus] = useState('');
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form
        className="space-y-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
          });
          if (res.ok) window.location.href = '/admin/providers';
          else setStatus('Invalid credentials');
        }}
      >
        <Input name="password" type="password" required placeholder="Password" />
        <Button type="submit">Sign in</Button>
      </form>
      {status ? <p>{status}</p> : null}
    </div>
  );
}
