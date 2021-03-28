declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    NODEMAILER_EMAIL: string;
    NODEMAILER_PASSWORD: string;
    REDIS_SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}
