import { hashPassword } from "@utils/encryption";
import { generateJwt } from "@utils/jwt";
import { SignUpImplementation } from "@implementations/mongoose/auth";
import { UserProviders, userProviderEnum } from "@models/user";

type SignUpUseCase = {
  email: string;
  name: string;
  password?: string;
  provider?: UserProviders;
};

export const SignUpUseCase = async (params: SignUpUseCase) => {
  const { email, name, password, provider } = params;

  const passwordHashed = !!password ? hashPassword(password) : undefined;

  const newUser = await SignUpImplementation({
    email,
    name,
    password: passwordHashed,
    provider,
  });

  return {
    user: newUser,
    token: generateJwt({
      _id: newUser._id.toString(),
    }),
  };
};
