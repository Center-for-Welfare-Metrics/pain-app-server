import {
  CountPatientsSuggestionImplementation,
  ListPatientsSuggestionImplementation,
} from "@implementations/mongoose/patient";
import { MakePagination } from "@utils/pagination";

type ListPatientsSuggestionUseCaseParams = {
  limit: number;
  page: number;
  user_id: string;
  sortBy?: string;
};

export const ListPatientsSuggestionUseCase = async (
  params: ListPatientsSuggestionUseCaseParams
) => {
  const { limit, page, user_id, sortBy } = params;

  const patients = await ListPatientsSuggestionImplementation({
    limit,
    page,
    user_id,
    sortBy,
  });

  const patientsCount = await CountPatientsSuggestionImplementation({
    user_id,
  });

  return MakePagination({
    data: patients,
    page,
    limit,
    totalCount: patientsCount,
  });
};
