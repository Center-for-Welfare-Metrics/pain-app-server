import * as facebookApi from "@external-api/facebook";
import * as googleApi from "@external-api/google";
import * as microsoftApi from "@external-api/microsoft";
import { generate } from "@utils/jwt";
import * as oauthConstants from "../constants/oauth";
import { UserModel } from "@models/user";

export const getAuthUrl = async (req, res, next) => {
  try {
    const { provider } = req.params;
    switch (provider) {
      case oauthConstants.providers.FACEBOOK:
        res.send({
          url: buildOAuthUrl(
            process.env.FACEBOOK_ID,
            process.env.FACEBOOK_SCOPES,
            oauthConstants.authUrls.FACEBOOK
          ),
        });
        break;
      case oauthConstants.providers.GOOGLE:
        res.send({
          url: buildOAuthUrl(
            process.env.GOOGLE_ID,
            process.env.GOOGLE_SCOPES,
            oauthConstants.authUrls.GOOGLE
          ),
        });
        break;
      case oauthConstants.providers.MICROSOFT:
        res.send({
          url: buildOAuthUrl(
            process.env.MICROSOFT_ID,
            process.env.MICROSOFT_SCOPES,
            oauthConstants.authUrls.MICROSOFT
          ),
        });
        break;
      default:
        res.status(400).send({ error: "Invalid provider" });
        break;
    }
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { provider } = req.params;
    const { accessCode } = req.body;

    const accessTokenData = await getOAuthToken(provider, accessCode);
    const userData = await getUserData(provider, accessTokenData.access_token);

    let searchedUser = await UserModel.findOne({
      email: userData.email,
    }).exec();
    if (!searchedUser) {
      searchedUser = await UserModel.create(new UserModel(userData));
    }
    const regularUserObj = searchedUser.toObject();
    delete regularUserObj.password;
    const userToken = generate(JSON.stringify(regularUserObj));
    res.send({
      ...regularUserObj,
      token: userToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const buildOAuthUrl = (clientId, scopes, url) => {
  const queryParams = {
    client_id: clientId,
    redirect_uri: process.env.OAUTH_CALLBACK_URL,
    scope: scopes,
    response_type: "code",
  };
  const querystring = new URLSearchParams(queryParams).toString();
  return `${url}?${querystring}`;
};

const getOAuthToken = async (provider, accessCode) => {
  let response;
  switch (provider) {
    case oauthConstants.providers.FACEBOOK:
      response = await facebookApi.getAuthToken(
        buildTokenRequestParams(
          accessCode,
          process.env.FACEBOOK_ID,
          process.env.FACEBOOK_SECRET
        )
      );
      break;
    case oauthConstants.providers.GOOGLE:
      response = await googleApi.getAuthToken(
        buildTokenRequestParams(
          accessCode,
          process.env.GOOGLE_ID,
          process.env.GOOGLE_SECRET
        )
      );
      break;
    case oauthConstants.providers.MICROSOFT:
      response = await microsoftApi.getAuthToken(
        buildTokenRequestParams(
          accessCode,
          process.env.MICROSOFT_ID,
          process.env.MICROSOFT_SECRET
        )
      );
      break;
    default:
      return false;
  }
  return response.data;
};

const buildTokenRequestParams = (code, clientId, clientSecret) => {
  const queryParams = {
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.OAUTH_CALLBACK_URL,
    client_id: clientId,
    client_secret: clientSecret,
  };
  return new URLSearchParams(queryParams).toString();
};

const getUserData = async (provider, accessToken) => {
  let user;
  let response;
  let data;
  let email;
  let emailList;
  switch (provider) {
    case oauthConstants.providers.FACEBOOK:
      response = await facebookApi.getUserData(accessToken);
      data = response.data;
      user = {
        name: data.name,
        email: data.email,
        provider: oauthConstants.providers.FACEBOOK,
      };
      break;
    case oauthConstants.providers.GOOGLE:
      response = await googleApi.getUserData(accessToken);
      data = response.data;
      user = {
        name: data.names[0].displayName,
        provider: oauthConstants.providers.GOOGLE,
      };
      email = data.emailAddresses[0].value;
      emailList = data.emailAddresses;
      for (let index = 0; index < emailList.length; index++) {
        if (emailList[index].metadata.primary) {
          email = emailList[index].value;
        }
      }
      user.email = email;
      break;
    case oauthConstants.providers.MICROSOFT:
      response = await microsoftApi.getUserData(accessToken);
      data = response.data;
      user = {
        name: data.displayName,
        email: data.userPrincipalName,
        provider: oauthConstants.providers.MICROSOFT,
      };
      break;
    default:
      return false;
  }

  // Return standarized user object with name and email fields
  return user;
};
