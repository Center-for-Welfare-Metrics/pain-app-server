import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  password: string;
  provider?: string;
  super?: boolean;
  role?: string;
}

export const userRoleEnum = ["doctor", "veterinarian"];

export const userProviderEnum = ["google", "facebook"] as const;

export type UserProviders = (typeof userProviderEnum)[number];

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: false },
    provider: { type: String, enum: userProviderEnum, required: false },
    super: { type: Boolean, default: false },
    role: { type: String, enum: userRoleEnum, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = model<IUser>("user", userSchema);
