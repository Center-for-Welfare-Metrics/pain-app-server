import {
  CountEpisodesImplementation,
  ListEpisodesImplementation,
} from "@implementations/mongoose/episodes";
import { MakePagination } from "@utils/pagination";

type ListEpisodesUseCaseParams = {
  patient_id: string;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListEpisodesUseCase = async (
  params: ListEpisodesUseCaseParams
) => {
  const { patient_id, limit, page, sortBy } = params;

  const patients = await ListEpisodesImplementation({
    patient_id,
    limit,
    page,
    sortBy,
  });

  const patientsCount = await CountEpisodesImplementation({ patient_id });

  return MakePagination({
    data: patients,
    page,
    limit,
    totalCount: patientsCount,
  });
};
