import axios from "axios";

const { FACEBOOK_GET_AUTH_TOKEN_URL, FACEBOOK_GET_USER_DATA_URL } = process.env;

export const getAuthToken = (queryParams: string) =>
  axios.get(`${FACEBOOK_GET_AUTH_TOKEN_URL}?${queryParams}`);

export const getUserData = (accessToken: string) =>
  axios.get(FACEBOOK_GET_USER_DATA_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
