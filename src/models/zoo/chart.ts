import mongoose from "mongoose";
const { Schema } = mongoose;

const plotInfoSchema = new Schema(
  {
    harmType: { type: Schema.Types.ObjectId, ref: "harm_type" },
  },
  { strict: false }
);

const chartSchema = new Schema(
  {
    productionSystemId: {
      type: Schema.Types.ObjectId,
      ref: "production_system",
    },
    plotInfo: [plotInfoSchema],
  },
  { strict: false }
);

export const ChartModel = mongoose.model("chart", chartSchema);
