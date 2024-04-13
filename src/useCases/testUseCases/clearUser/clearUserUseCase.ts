import {
  GetUserByEmailImplementation,
  GetUserByIdImplementation,
} from "@implementations/mongoose/auth";
import { DeletePatientsByUserIdImplementation } from "@implementations/mongoose/patient";

type ClearUserUseCasaParams = {
  user_id: string;
};

export const ClearUserUseCase = async ({ user_id }: ClearUserUseCasaParams) => {
  const testUser = await GetUserByIdImplementation(user_id);

  if (!testUser) {
    return;
  }

  if (!testUser.email.endsWith("@test.test")) {
    return;
  }

  DeletePatientsByUserIdImplementation({ user_id });
};
