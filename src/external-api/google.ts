import axios from "axios";

const GOOGLE_GET_TOKEN = "https://oauth2.googleapis.com/token";
const GOOGLE_GET_USER_INFO = "https://www.googleapis.com/oauth2/v2/userinfo";

export const getGoogleAuthAccessToken = async (code: string) => {
  const { data } = await axios({
    url: GOOGLE_GET_TOKEN,
    method: "POST",
    data: {
      client_id: process.env.GOOGLE_OATH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OATH_SECRET_ID,
      redirect_uri: process.env.OAUTH_REDIRECT_TO,
      grant_type: "authorization_code",
      code,
    },
  });

  return data.access_token;
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const { data } = await axios({
    url: GOOGLE_GET_USER_INFO,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    id: data.id,
    email: data.email,
    firstName: data.given_name,
    lastName: data.family_name,
  };
};
