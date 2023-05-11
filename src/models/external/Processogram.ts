import mongoose from "mongoose";

const CommonInformations = {
  name: { type: String, required: false },
  description: { type: String, required: false },
  medias: [Object],
};

const ProcessogramSchema = new mongoose.Schema(
  {
    specie: { type: String, required: true },
    productionSystem: { type: mongoose.Types.ObjectId, required: true },
    ...CommonInformations,
    lifefates: [
      {
        lifeFate: { type: mongoose.Types.ObjectId, required: true },
        ...CommonInformations,
        phases: [
          {
            phase: { type: mongoose.Types.ObjectId, required: true },
            ...CommonInformations,
            circumstances: [
              {
                circumstance: { type: mongoose.Types.ObjectId, required: true },
                ...CommonInformations,
                prevalence: { type: Object },
                ocurrence: { type: Object },
                severity: { type: Number },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const WmPlatformDB = mongoose.connection.useDb(
  process.env.WM_DB || "wmplatform_danger_13131717"
);
export const ProcessogramModel = WmPlatformDB.model(
  "Processogram",
  ProcessogramSchema
);
