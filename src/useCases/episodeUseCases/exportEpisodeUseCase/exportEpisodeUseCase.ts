import { FullExportEpisodeImplementation } from "@implementations/mongoose/episodes";

type ExportEpisodeUseCaseParams = {
  id: string;
};

export const ExportEpisodeUseCase = async (
  params: ExportEpisodeUseCaseParams
) => {
  const { id } = params;

  const episode = await FullExportEpisodeImplementation({
    episode_id: id,
  });

  return episode;
};
