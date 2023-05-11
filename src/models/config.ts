import { Schema, model } from "mongoose";

const Config = new Schema({
  hens_production_system: {
    type: Schema.Types.ObjectId,
    ref: "production_system",
    required: false,
  },
  broilers_production_system: {
    type: Schema.Types.ObjectId,
    ref: "production_system",
    required: false,
  },
  stunning_production_system: {
    type: Schema.Types.ObjectId,
    ref: "production_system",
    required: false,
  },
  name: { type: String },
});

export const ConfigModel = model("config", Config);
