import { Request, Response } from "express";
import { SugestionSpeciesFieldUseCase } from "./speciesFieldUseCase";
import { body, query, param } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";
import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";
import { EpisodePermissionValidate } from "@utils/episode/validate";

type SugestionSpecieFieldParams = {
  animal: string;
};

export const SugestionSpeciesFieldController = async (
  request: Request<SugestionSpecieFieldParams, any, any, any>,
  response: Response
) => {
  try {
    const { animal } = request.params;

    const TracksListWithPagination = await SugestionSpeciesFieldUseCase({
      animal,
    });

    return response.status(200).json(TracksListWithPagination);
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

export const SugestionSpeciesFieldValidator = () => [
  param("animal").isString(),
];
