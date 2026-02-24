export type AppEnv = {
  DATABASE_URL?: string;
  DATABASE_AUTH_TOKEN?: string;
  ADMIN_PASSWORD?: string;
  RESEND_API_KEY?: string;
  SITE_OWNER_EMAIL?: string;
  APP_BASE_URL?: string;
};

export const getAppEnv = (): AppEnv => ({
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  SITE_OWNER_EMAIL: process.env.SITE_OWNER_EMAIL,
  APP_BASE_URL: process.env.APP_BASE_URL
});
