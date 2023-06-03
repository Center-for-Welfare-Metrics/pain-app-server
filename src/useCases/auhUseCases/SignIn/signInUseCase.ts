import { checkPassword } from "@utils/encryption";
import { generateJwt } from "@utils/jwt";
import { GetUserByEmailImplementation } from "@implementations/mongoose/auth";

type SignInUseCase = {
  email: string;
  password: string;
};

export const SignInUseCase = async (params: SignInUseCase) => {
  const { email, password } = params;

  const newUser = await GetUserByEmailImplementation(email);

  const isPasswordCorrect = checkPassword(password, newUser.password);

  if (!isPasswordCorrect) {
    throw new Error();
  }

  return {
    user: newUser,
    token: generateJwt({
      email: newUser.email,
      name: newUser.name,
      _id: newUser._id.toString(),
    }),
  };
};
