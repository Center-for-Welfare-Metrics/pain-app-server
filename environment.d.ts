declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECTION_URL: string;
      APP_SECRET: string;
      OPENAI_APIKEY: string;
      OPENAI_ORGANIZATION: string;
      GOOGLE_RECAPTCHA_SITE_KEY: string;
      GOOGLE_PROJECT_ID: string;
      PORT: string;
      ENV: string;
      GOOGLE_OATH_CLIENT_ID: string;
      GOOGLE_OATH_SECRET_ID: string;
      OAUTH_REDIRECT_TO: string;
      AWS_ID: string;
      AWS_SECRET_KEY: string;
      RECOVERY_PASSWORD_URL: string;
      SUPPORT_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
