import { ISegmentValues } from "@models/segment";
import { Request, Response } from "express";
import { UpdateSegmentJustificationUseCase } from "./updateSegmentJustificationUseCase";

type CreateJustificationRequestParams = {
  justification_id: string;
};

type CreateJustificationRequestBody = Partial<{
  title: string;
  type_of_evidence: string;
  description: string;
  sources: string;
  ranking: ISegmentValues;
}>;

export const UpdateSegmentJustificationController = async (
  request: Request<
    CreateJustificationRequestParams,
    any,
    CreateJustificationRequestBody
  >,
  response: Response
) => {
  const { justification_id } = request.params;

  const { title, type_of_evidence, description, sources, ranking } =
    request.body;

  try {
    const justification = await UpdateSegmentJustificationUseCase({
      justification_id,
      update: {
        title,
        type_of_evidence,
        description,
        sources,
        ranking,
      },
    });

    return response.status(200).json(justification);
  } catch (err) {
    return response.sendStatus(500);
  }
};
