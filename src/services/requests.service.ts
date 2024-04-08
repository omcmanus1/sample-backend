import { Types } from "mongoose";
import Request from "../mongodb/models/Requests";
import { OperationType, Status } from "../types";

export const getAllRequests = async () => {
  try {
    const allRequests = await Request.find();
    return allRequests;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getRequestById = async (requestId: string) => {
  try {
    const requestEntry = await Request.findById(requestId);
    return requestEntry;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

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
    return newRequest.requestId;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

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
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
