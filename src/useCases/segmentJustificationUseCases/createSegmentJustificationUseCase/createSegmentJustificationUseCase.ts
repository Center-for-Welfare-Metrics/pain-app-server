import {
  CreateJustificationImplementation,
  GetJustificationsCountBySegmentIdImplementation,
} from "@implementations/mongoose/segment-justification";

type CreateSegmentJustificationParams = {
  segment_id: string;
};

export const CreateSegmentJustificationUseCase = async (
  params: CreateSegmentJustificationParams
) => {
  const { segment_id } = params;

  const justificationCount =
    await GetJustificationsCountBySegmentIdImplementation({
      segment_id,
    });

  const justification = await CreateJustificationImplementation({
    title: `New Justification ${justificationCount + 1}`,
    description: "",
    sources: "",
    ranking: {
      annoying: 0,
      disabling: 0,
      excruciating: 0,
      hurful: 0,
      no_pain: 0,
    },
    segment_id,
  });

  return justification;
};
