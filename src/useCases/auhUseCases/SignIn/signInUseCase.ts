import { checkPassword } from "@utils/encryption";
import { generateJwt } from "@utils/jwt";
import { GetUserByEmailImplementation } from "@implementations/mongoose/auth";

type SignInUseCase = {
  email: string;
  password: string;
};

export const SignInUseCase = async (params: SignInUseCase) => {
  const { email, password } = params;

  const user = await GetUserByEmailImplementation(email);

  const isPasswordCorrect = checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error();
  }

  return {
    user: user,
    token: generateJwt({
      email: user.email,
      name: user.name,
      _id: user._id.toString(),
    }),
  };
};
