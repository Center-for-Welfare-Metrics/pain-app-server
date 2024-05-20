import {
  CountBookmarkPatientsImplementation,
  ListBookmarkPatientsImplementation,
} from "@implementations/mongoose/patients-bookmark";
import { MakePagination } from "@utils/pagination";

type ListPatientsUseCaseParams = {
  user_id: string;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListBookmarkPatientsUseCase = async (
  params: ListPatientsUseCaseParams
) => {
  const { user_id, limit, page, sortBy } = params;

  const patients = await ListBookmarkPatientsImplementation({
    user_id,
    limit,
    page,
    sortBy,
  });

  const patientsCount = await CountBookmarkPatientsImplementation({ user_id });

  return MakePagination({
    data: patients,
    page,
    limit,
    totalCount: patientsCount,
  });
};
