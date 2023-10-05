import { Schema, model } from "mongoose";

export type RecoveryPassword = {
  user_id: string;
  token: string;
  expires_at: Date;
  createdAt: Date;
  updatedAt: Date;
};

const recoveryPasswordSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    token: { type: String, required: true, index: true },
    expires_at: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const RecoveryPasswordModel = model<RecoveryPassword>(
  "recovery_password",
  recoveryPasswordSchema
);
