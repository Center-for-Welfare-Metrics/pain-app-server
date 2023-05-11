import { Schema, model } from "mongoose";

const schemaProperties = {
  harmCategoryId: { type: Schema.Types.ObjectId, ref: "harm_category" },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: false },
  order: { type: Number, required: false },
  color: { type: String },
};

const HarmTypeSchema = new Schema(schemaProperties);

export const HarmTypeModel = model("harm_type", HarmTypeSchema);
