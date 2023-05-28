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

  try {
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
  } catch (error) {
    throw error;
  }
};

export const VerifyIfEmailExists = async (email: string) => {
  try {
    const user = await UserModel.exists({ email });

    if (user) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};
