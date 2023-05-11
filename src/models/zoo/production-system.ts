import mongoose from "mongoose";
import { IBurden } from "./burden";
const { Schema } = mongoose;

type IProductionSystem = {
  userId: string;
  name: string;
  comments: string;
  order: number;
  burdens: IBurden[];
};

const productionSystemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    name: { type: String },
    comments: { type: String, required: false },
    order: { type: Number, required: false },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

productionSystemSchema.virtual("burdens", {
  ref: "burden",
  localField: "_id",
  foreignField: "productionSystemId",
  justOne: false,
});

export const ProductionSystemModel = mongoose.model<IProductionSystem>(
  "production_system",
  productionSystemSchema
);
