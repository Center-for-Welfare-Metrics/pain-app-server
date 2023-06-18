import { Request, Response } from "express";
import { GetPatientByIdUseCase } from "./getPatientByIdUseCase";
import { param } from "express-validator";

type GetPatientByIdRequestParams = {
  id: string;
};

export const GetPatientByIdController = async (
  request: Request<GetPatientByIdRequestParams>,
  response: Response
) => {
  try {
    const { id } = request.params;

    const user_id = request["user"]._id;

    const patient = await GetPatientByIdUseCase({
      id,
      user_id,
    });

    return response.status(200).json(patient);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const GetPatiengByIdValidator = () => [
  param("id").isMongoId().withMessage("Invalid id"),
];
