import { UserModel } from "@models/user";

type SignUpParams = {
  email: string;
  name: string;
  password: string;
};

export const SignUp = async (params: SignUpParams) => {
  const { email, name, password } = params;

  try {
    const newUser = await UserModel.create({
      email,
      name,
      password,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

type SignInParams = {
  email: string;
  password: string;
};

export const SignIn = async (params: SignInParams) => {
  const { email, password } = params;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error();
  } else {
    if (user.password === password) {
      return user;
    } else {
      throw new Error();
    }
  }
};

export const VerifyIfEmailExists = async (email: string) => {
  const user = await UserModel.exists({ email });

  if (user) {
    return true;
  }

  return false;
};

export const GetMe = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (user) {
    return user;
  }

  throw new Error();
};
