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
    return response.status(500).json({ message: err.message });
  }
};

export const GetPatiengByIdValidator = () => [
  param("id").isMongoId().withMessage("Invalid id"),
];
