import {
  CountPatientsImplementation,
  ListPatientsImplementation,
} from "@implementations/mongoose/patient";
import { MakePagination } from "@utils/pagination";

type ListPatientsUseCaseParams = {
  user_id: string;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListPatientsUseCase = async (
  params: ListPatientsUseCaseParams
) => {
  const { user_id, limit, page, sortBy } = params;

  const patients = await ListPatientsImplementation({
    user_id,
    limit,
    page,
    sortBy,
  });

  const patientsCount = await CountPatientsImplementation({ user_id });

  return MakePagination({
    data: patients,
    page,
    limit,
    totalCount: patientsCount,
  });
};
