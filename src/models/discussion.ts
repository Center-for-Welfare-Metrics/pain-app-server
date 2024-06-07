import { Schema, model } from "mongoose";

type DiscussionType = {
  path: string;
  user_id: string;
  text: string;
  patient_id?: string;
  episode_id?: string;
  parent_id: string | null;
};

const DiscussionSchema = new Schema({
  path: {
    type: String,
    required: false,
    default: "",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  patient_id: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  episode_id: {
    type: Schema.Types.ObjectId,
    ref: "Episode",
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: "Discussion",
    default: null,
  },
});

export const DiscussionModel = model<DiscussionType>(
  "discussion",
  DiscussionSchema
);
