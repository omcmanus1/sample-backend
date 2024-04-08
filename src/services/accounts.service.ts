import Account from "../mongodb/models/Account";
import { createRequest, updateRequest } from "./requests.service";

type AccountDetails = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "deleted";
  AccountRequest: "active" | "deleted";
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export const getAccounts = async () => {
  try {
    const accounts = await Account.find();
    return accounts;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getAccountById = async (accountId: string) => {
  try {
    const accounts = await Account.findById(accountId);
    return accounts;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const createAccount = async (accountDetails: AccountDetails) => {
  let requestId;
  try {
    requestId = await createRequest("create");
    const account = await Account.create(accountDetails);
    if (account.createdAt && requestId) {
      await updateRequest({
        requestId,
        status: "successful",
      });
    }
    return account;
  } catch (err) {
    if (requestId) {
      await updateRequest({
        requestId,
        status: "failed",
      });
    }
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const deleteAccount = async (accountId: string) => {
  try {
    const deleted = await Account.deleteOne({ _id: accountId });
    return deleted;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const softDeleteAccount = async (accountId: string) => {
  try {
    const deleted = await Account.updateOne(
      { _id: accountId },
      { deletedAt: new Date() }
    );
    return deleted;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const deleteAllAccounts = async () => {
  try {
    const deleted = await Account.deleteMany({});
    return deleted;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
