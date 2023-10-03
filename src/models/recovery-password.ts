import { Schema, model } from "mongoose";

export type RecoveryPassword = {
  user_id: string;
  token: string;
  expires_at: Date;
};

const recoveryPasswordSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
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
