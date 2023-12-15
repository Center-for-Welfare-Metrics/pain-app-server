import { ISegmentValues } from "@models/segment";
import { Request, Response } from "express";
import { DeleteSegmentJustificationUseCase } from "./deleteSegmentJustificationUseCase";

type DeleteJustificationRequestParams = {
  justification_id: string;
};

export const DeleteSegmentJustificationController = async (
  request: Request<DeleteJustificationRequestParams>,
  response: Response
) => {
  const { justification_id } = request.params;

  try {
    const justification = await DeleteSegmentJustificationUseCase({
      justification_id,
    });

    return response.status(200).json(justification);
  } catch (err) {
    return response.sendStatus(500);
  }
};
