import { Request, Response } from "express";
import { IRole } from "src/types";
import { SetUserRoleUseCase } from "./setUserRoleUseCase";
import { body } from "express-validator";

type SetUserRoleRequestBody = {
  role: IRole;
};

export const SetUserRoleController = async (
  req: Request<any, any, SetUserRoleRequestBody>,
  res: Response
) => {
  try {
    const { role } = req.body;
    const user_id = req["user"]._id;
    await SetUserRoleUseCase({ user_id, role });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const SetUserRoleValidator = () => [
  body("role").isIn(["doctor", "veterinarian"]),
];
