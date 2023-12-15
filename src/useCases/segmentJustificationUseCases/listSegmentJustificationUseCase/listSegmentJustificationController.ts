import { ISegmentValues } from "@models/segment";
import { Request, Response } from "express";
import { ListSegmentJustificationUseCase } from "./listSegmentJustificationUseCase";

type ListJustificationRequestParams = {
  segment_id: string;
};

export const ListSegmentJustificationController = async (
  request: Request<ListJustificationRequestParams>,
  response: Response
) => {
  const { segment_id } = request.params;

  try {
    const justifications = await ListSegmentJustificationUseCase({
      segment_id,
    });

    return response.status(200).json(justifications);
  } catch (err) {
    return response.sendStatus(500);
  }
};
