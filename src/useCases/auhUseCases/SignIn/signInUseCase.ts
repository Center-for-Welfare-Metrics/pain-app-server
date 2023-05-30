import { checkPassword, hashPassword } from "@utils/encryption";
import { generateJwt } from "@utils/jwt";
import { GetUserByEmail } from "@implementations/mongoose/auth";

type SignInUseCase = {
  email: string;
  password: string;
};

export const SignInUseCase = async (params: SignInUseCase) => {
  const { email, password } = params;

  const newUser = await GetUserByEmail(email);

  const isPasswordCorrect = checkPassword(password, newUser.password);

  if (!isPasswordCorrect) {
    throw new Error();
  }

  return {
    user: newUser,
    token: generateJwt({
      email: newUser.email,
      name: newUser.name,
    }),
  };
};
