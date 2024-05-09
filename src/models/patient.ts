import { Schema, model } from "mongoose";

export const patientTypeEnum = ["human", "animal"] as const;

export type PatientTypeEnum = (typeof patientTypeEnum)[number];

export type PatientType = {
  name: string;
  birth_date?: string;
  creator_id: string;
  type: PatientTypeEnum;
  production_system?: string;
  life_fate?: string;
  about?: string;
  location?: string;
  common_name?: string;
  scientific_name?: string;
  episodes_count: number;
};

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    birth_date: { type: Date, required: false },
    creator_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    type: { type: String, enum: patientTypeEnum, required: true },
    production_system: { type: String, required: false },
    life_fate: { type: String, required: false },
    about: { type: String, required: false },
    location: { type: String, required: false },
    common_name: { type: String, required: false },
    scientific_name: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

patientSchema.virtual("episodes_count", {
  ref: "episode",
  localField: "_id",
  foreignField: "patient_id",
  count: true,
});

patientSchema.virtual("bookmarked", {
  ref: "patients_bookmark",
  localField: "_id",
  foreignField: "patient_id",
  count: true,
  match: (patient) => ({ user_id: patient.creator_id }),
});

patientSchema.set("toObject", { virtuals: true });
patientSchema.set("toJSON", { virtuals: true });

export const PatientModel = model<PatientType>("patient", patientSchema);
