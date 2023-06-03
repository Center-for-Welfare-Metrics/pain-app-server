import { UserModel } from "@models/user";

type SignUpParams = {
  email: string;
  name: string;
  password: string;
};

export const SignUpImplementation = async (params: SignUpParams) => {
  const { email, name, password } = params;

  const newUser = await UserModel.create({
    email,
    name,
    password,
  });
  return newUser;
};

type SignInParams = {
  email: string;
  password: string;
};

export const SignInImplementation = async (params: SignInParams) => {
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

export const VerifyIfEmailExistsImplementation = async (email: string) => {
  const user = await UserModel.exists({ email });

  if (user) {
    return true;
  }

  return false;
};

export const GetUserByEmailImplementation = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (user) {
    return user;
  }

  throw new Error();
};

export const GetUserByIdImplementation = async (id: string) => {
  const user = await UserModel.findById(id);

  if (user) {
    return user;
  }

  throw new Error();
};
