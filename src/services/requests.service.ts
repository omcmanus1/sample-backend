import { Types } from "mongoose";
import Request from "../mongodb/models/Requests";
import { handleError } from "../utils";

type Status = "pending" | "successful" | "failed";
type OperationType = "create" | "update" | "delete";

export const getAllRequests = async () => {
  try {
    const allRequests = await Request.find();
    return allRequests;
  } catch (err) {
    handleError(err);
  }
};

export const getRequestById = async (requestId: string) => {
  try {
    const requestEntry = await Request.findById(requestId);
    return requestEntry;
  } catch (err) {
    handleError(err);
  }
};

// Called at the beginning of the service file for each account endpoint
// Creates a likely unique ID to pass to update function for mutating
// Creates a new request entry with a "pending" status until outcome is determined
export const createRequest = async (type: OperationType) => {
  const requestId = new Types.ObjectId().toString();
  try {
    if (!type) {
      throw new Error("Missing operation type");
    }
    const newRequest = await Request.create({
      requestId,
      type,
      status: "pending",
    });
    return newRequest.requestId || "";
  } catch (err) {
    handleError(err);
  }
};

// Called after DB processing operation for each account endpoint
// "successful" or "failed" passed in as status depending on outcome
// Mutates existing request object (referenced by requestId)
export const updateRequest = async ({
  requestId,
  status,
}: {
  requestId: string;
  status: Status;
}) => {
  try {
    if (!requestId || !status) {
      throw new Error("Missing requirements");
    }
    const request = await Request.updateOne({ requestId }, { status });
    return request;
  } catch (err) {
    handleError(err);
  }
};
