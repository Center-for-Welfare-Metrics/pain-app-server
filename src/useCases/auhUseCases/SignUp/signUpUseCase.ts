import { hashPassword } from "@utils/encryption";
import { generateJwt } from "@utils/jwt";
import { SignUp, VerifyIfEmailExists } from "@implementations/mongoose/auth";

type SignUpUseCase = {
  email: string;
  name: string;
  password: string;
};

export const SignUpUseCase = async (params: SignUpUseCase) => {
  const { email, name, password } = params;

  const passwordHashed = hashPassword(password);

  const newUser = await SignUp({
    email,
    name,
    password: passwordHashed,
  });

  return {
    user: newUser,
    token: generateJwt({
      email: newUser.email,
      name: newUser.name,
    }),
  };
};
