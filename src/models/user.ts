import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  password: string;
  provider?: string;
  super?: boolean;
}

export const userProviderEnum = ["google", "facebook"] as const;

export type UserProviders = (typeof userProviderEnum)[number];

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: false },
    provider: { type: String, enum: userProviderEnum, required: false },
    super: { type: Boolean, default: false },
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

userSchema.virtual("noPassword").get(function () {
  return this.password === undefined;
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export const UserModel = model<IUser>("user", userSchema);
