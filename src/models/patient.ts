import { Schema, model } from "mongoose";

const patientSchema = new Schema({
  name: { type: String, required: true },
  birth_date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  about: { type: String, required: false },
});

export const PatientModel = model("patient", patientSchema);
