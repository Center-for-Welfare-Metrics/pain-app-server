import {
  getGoogleAuthAccessToken,
  getGoogleUserInfo,
} from "@external-api/google";
import { GetUserByEmailImplementation } from "@implementations/mongoose/auth";
import { generateJwt } from "@utils/jwt";
import { SignUpUseCase } from "../SignUp/signUpUseCase";

export const googleOAuthAutenticateUseCase = async (code: string) => {
  const accessToken = await getGoogleAuthAccessToken(code);
  const userInfo = await getGoogleUserInfo(accessToken);

  const email = userInfo.email;

  const user = await GetUserByEmailImplementation(email);

  if (!!user) {
    return {
      user: user,
      token: generateJwt({
        email: user.email,
        name: user.name,
        _id: user._id.toString(),
      }),
    };
  }

  const newUserWithToken = await SignUpUseCase({
    email: userInfo.email,
    name: userInfo.firstName,
    provider: "google",
  });

  return newUserWithToken;
};
