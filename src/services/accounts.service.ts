import { isValidObjectId } from "mongoose";
import Account from "../mongodb/models/Account";
import { handleError } from "../utils";
import { createRequest, updateRequest } from "./requests.service";

type AccountDetails = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "deleted";
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export const getAccounts = async () => {
  try {
    const accounts = await Account.find();
    if (accounts) {
      return accounts;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    return handleError(err);
  }
};

export const getAccountById = async (accountId: string, requestId?: string) => {
  try {
    if (!isValidObjectId(accountId)) {
      throw new Error("Invalid ID");
    }
    const account = await Account.findById(accountId);
    if (account) {
      return account;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    return handleError(err, requestId);
  }
};

export const createAccount = async (accountDetails: AccountDetails) => {
  let requestId;
  try {
    requestId = await createRequest("create");
    const account = await Account.create(accountDetails);
    if (requestId) {
      await updateRequest({
        requestId,
        status: account.createdAt && requestId ? "successful" : "failed",
      });
    }
    if (account.createdAt) {
      return account;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    return handleError(err);
  }
};

export const deleteAccount = async (accountId: string) => {
  let requestId;
  try {
    requestId = await createRequest("delete");
    const deleted = await Account.deleteOne({ _id: accountId });
    if (requestId) {
      await updateRequest({
        requestId,
        status: deleted.acknowledged ? "successful" : "failed",
      });
    }
    if (deleted.acknowledged) {
      return deleted;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    return handleError(err);
  }
};

export const softDeleteAccount = async (accountId: string) => {
  let requestId;
  try {
    requestId = await createRequest("delete");

    // check existing account records
    const account = await getAccountById(accountId, requestId);
    if (!account && requestId) {
      await updateRequest({
        requestId,
        status: "failed",
      });
      throw new Error("Account does not exist ");
    }
    if (account && account.status === "deleted" && requestId) {
      await updateRequest({
        requestId,
        status: "failed",
      });
      throw new Error("Account already deleted");
    }

    const deleted = await Account.updateOne(
      { _id: accountId },
      { status: "deleted", deletedAt: new Date() }
    );
    if (requestId) {
      await updateRequest({
        requestId,
        status: deleted.acknowledged ? "successful" : "failed",
      });
    }
    if (account) {
      return accountId;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    return handleError(err, requestId);
  }
};

export const deleteAllAccounts = async () => {
  let requestId;
  try {
    requestId = await createRequest("delete");
    const deleted = await Account.deleteMany({});
    if (requestId) {
      await updateRequest({
        requestId,
        status: deleted.acknowledged ? "successful" : "failed",
      });
    }
    if (deleted.acknowledged) {
      return deleted;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    return handleError(err);
  }
};
