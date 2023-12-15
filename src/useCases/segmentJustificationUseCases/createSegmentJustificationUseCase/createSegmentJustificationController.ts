import { ISegmentValues } from "@models/segment";
import { Request, Response } from "express";
import { CreateSegmentJustificationUseCase } from "./createSegmentJustificationUseCase";

type CreateJustificationRequestParams = {
  segment_id: string;
};

export const CreateJustificationController = async (
  request: Request<CreateJustificationRequestParams, any>,
  response: Response
) => {
  const { segment_id } = request.params;

  try {
    const justification = await CreateSegmentJustificationUseCase({
      segment_id,
    });

    return response.status(200).json(justification);
  } catch (err) {
    console.log(err);
    return response.sendStatus(500);
  }
};
