import { Request, Response } from "express";
import { ListEpisodesUseCase } from "./listEpisodeUseCase";
import { query } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";

type ListEpisodesRequestQuery = {
  page: number;
  limit: number;
  patient_id: string;
  sortBy?: string;
};

export const ListEpisodesController = async (
  request: Request<any, any, any, ListEpisodesRequestQuery>,
  response: Response
) => {
  try {
    const { page, limit, sortBy, patient_id } = request.query;

    const episodesListWithPagination = await ListEpisodesUseCase({
      patient_id,
      page,
      limit,
      sortBy,
    });

    return response.status(200).json(episodesListWithPagination);
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

export const ListEpisodesValidator = () => [
  query("patient_id")
    .isMongoId()
    .custom(async (patient_id, { req }) => {
      const user_id = req["user"]._id;

      const patient = await GetPatientByIdImplementation(patient_id);

      if (!patient) {
        throw new Error("Patient not found");
      }

      // if (patient.creator_id.toString() !== user_id) {
      //   throw new Error("Patient not found");
      // }
    }),
];
