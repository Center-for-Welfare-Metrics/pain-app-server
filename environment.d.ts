declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECTION_URL: string;
      APP_SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      GOOGLE_SCOPES: string;
      OAUTH_CALLBACK_URL: string;
      CALCULUS: string;
      WM_DB: string;
      GITLAB_PERSONAL_TOKEN: string;
      GITLAB_PROJECT_ID: string;
      MICROSOFT_GET_AUTH_TOKEN_URL: string;
      MICROSOFT_GET_USER_DATA_URL: string;
      GOOGLE_GET_AUTH_TOKEN_URL: string;
      GOOGLE_GET_USER_DATA_URL: string;
      GITLAB_API_BASE_URL: string;
      FACEBOOK_GET_AUTH_TOKEN_URL: string;
      FACEBOOK_GET_USER_DATA_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
