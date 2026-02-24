import { getAppEnv } from './env';

export async function sendLeadEmail(subject: string, html: string, to?: string[]) {
  const env = getAppEnv();
  if (!env.RESEND_API_KEY || !env.SITE_OWNER_EMAIL) return;

  const recipients = to && to.length > 0 ? to : [env.SITE_OWNER_EMAIL];
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'VegasMobileIV <onboarding@resend.dev>',
      to: recipients,
      subject,
      html
    })
  });
}
