declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    SENDGRID_API_KEY: string;
    STRIPE_SECRET: string;
    PRICE: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    FACEBOOK_APP_ID: string;
    FACEBOOK_APP_SECRET: string;
    LINKEDIN_KEY: string;
    LINKEDIN_SECRET: string;
    SERVER_URL: string;
  }
}
