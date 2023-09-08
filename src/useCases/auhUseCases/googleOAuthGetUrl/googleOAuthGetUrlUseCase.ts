const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export const googleOAuthGetUrlUseCase = async () => {
  const CLIENT_ID = process.env.GOOGLE_OATH_CLIENT_ID;
  const REDIRECT_TO = process.env.OAUTH_REDIRECT_TO;
  const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_TO,
    scope: SCOPES.join(" "),
    response_type: "code",
  };

  const queryString = new URLSearchParams(params).toString();

  const url = `${GOOGLE_AUTH_URL}?${queryString}`;

  return url;
};
