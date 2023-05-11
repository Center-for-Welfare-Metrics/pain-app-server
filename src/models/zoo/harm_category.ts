import { Schema, model } from "mongoose";
import { HarmTypeModel } from "@models/zoo/harm_type";

const HarmCategorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    name: { type: String },
    order: { type: Number, required: false },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

HarmCategorySchema.virtual("harms", {
  ref: "harm_type",
  localField: "_id",
  foreignField: "harmCategoryId",
  justOne: false,
});

HarmCategorySchema.post("deleteOne", async (doc) => {
  await HarmTypeModel.deleteMany({ harmCategoryId: doc._id }).exec();
});

export const HarmCategoryModel = model("harm_category", HarmCategorySchema);
