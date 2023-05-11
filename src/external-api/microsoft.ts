import axios from "axios";

const { MICROSOFT_GET_AUTH_TOKEN_URL, MICROSOFT_GET_USER_DATA_URL } =
  process.env;

export const getAuthToken = (queryParams) =>
  axios.post(MICROSOFT_GET_AUTH_TOKEN_URL, queryParams);

export const getUserData = (accessToken) =>
  axios.get(MICROSOFT_GET_USER_DATA_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
