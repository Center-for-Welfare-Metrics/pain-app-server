import mongoose from "mongoose";

const CircumstanceSchema = new mongoose.Schema(
  {
    specie: { type: String },
    name: { type: String, required: true, immutable: true },
    prevalence: { type: Object },
    occurrence: { type: Object },
    severity: { type: Number },
    description: { type: String },
    createdBy: { type: mongoose.Types.ObjectId },
    lastUpdatedBy: { type: mongoose.Types.ObjectId },
    medias: [],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const WmPlatformDB = mongoose.connection.useDb(
  process.env.WM_DB || "wmplatform_danger_13131717"
);

export const CircumstanceModel = WmPlatformDB.model(
  "Circumstance",
  CircumstanceSchema
);
