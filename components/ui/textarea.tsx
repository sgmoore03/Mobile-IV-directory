import * as React from 'react';
import { cn } from '@/lib/utils';

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('min-h-24 w-full rounded-md border px-3 py-2 text-sm')} {...props} />;
}
