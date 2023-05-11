import mongoose from "mongoose";

const PhaseSchema = new mongoose.Schema(
  {
    specie: { type: String },
    name: { type: String, required: true, immutable: true },
    description: { type: String },
    createdBy: { type: mongoose.Types.ObjectId },
    lastUpdatedBy: { type: mongoose.Types.ObjectId },
    medias: [],
  },
  {
    timestamps: true,
  }
);

const WmPlatformDB = mongoose.connection.useDb(
  process.env.WM_DB || "wmplatform_danger_13131717"
);

export const PhaseModel = WmPlatformDB.model("Phase", PhaseSchema);
