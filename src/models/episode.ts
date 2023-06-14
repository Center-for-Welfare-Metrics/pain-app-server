import { Schema, model } from "mongoose";

const episodeSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    diagnosis: { type: String },
    start_date: { type: Date },
    comment: { type: String },
    patient_id: { type: Schema.Types.ObjectId, ref: "patient", required: true },
    creator_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
  }
);

episodeSchema.virtual("patient", {
  ref: "patient",
  localField: "patient_id",
  foreignField: "_id",
  justOne: true,
});

episodeSchema.set("toObject", { virtuals: true });
episodeSchema.set("toJSON", { virtuals: true });

export const EpisodeModel = model("episode", episodeSchema);