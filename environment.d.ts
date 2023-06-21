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
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
