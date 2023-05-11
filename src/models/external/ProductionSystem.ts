import mongoose from "mongoose";

const ProductionSystemSchema = new mongoose.Schema(
  {
    specie: { type: String },
    name: { type: String, required: true, immutable: true },
    description: { type: String },
    global_population: { type: String },
    name_synonyms: [String],
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

export const ProductionSystemModel = WmPlatformDB.model(
  "ProductionSystem",
  ProductionSystemSchema
);
