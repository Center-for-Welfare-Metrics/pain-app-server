/* eslint-disable linebreak-style */
import { Schema, model } from "mongoose";

const schemaProperties = {
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
  country_id: { type: String, required: false },
  name: { type: String, required: false, default: "John Doe" },
  sex: { type: String, required: false },
  birth: { type: Date, required: false },
  comments: { type: String, required: false },
};

const patientSchema = new Schema(schemaProperties);

patientSchema.virtual("episodesCount", {
  ref: "episode",
  localField: "_id",
  foreignField: "patientId",
  justOne: false,
  count: true,
  match: { userId: { $exists: true, $ne: null } },
});

export const PatientModel = model("patient", patientSchema);
