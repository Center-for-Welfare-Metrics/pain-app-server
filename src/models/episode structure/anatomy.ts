import { Schema } from "mongoose";

export const AnatomySchema = new Schema({
  name: { type: String },
  comments: { type: String },
});
