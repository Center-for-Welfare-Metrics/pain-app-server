import axios from "axios";

const { GOOGLE_GET_AUTH_TOKEN_URL, GOOGLE_GET_USER_DATA_URL } = process.env;

export const getAuthToken = (queryParams: string) =>
  axios.post(GOOGLE_GET_AUTH_TOKEN_URL, queryParams);

export const getUserData = (accessToken: string) =>
  axios.get(GOOGLE_GET_USER_DATA_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
