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
      annoying: 2,
      disabling: 2,
      excruciating: 2,
      hurful: 2,
      no_pain: 2,
    },
    segment_id,
  });

  return justification;
};
