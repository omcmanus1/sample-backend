import { updateRequest } from "../services/requests.service";

export const handleError = async (err: unknown, requestId?: string) => {
  if (requestId) {
    await updateRequest({
      requestId,
      status: "failed",
    });
  }
  if (err instanceof Error) {
    throw err;
  } else {
    throw new Error("An unknown error occurred");
  }
};
