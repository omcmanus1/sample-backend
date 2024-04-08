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
    await updateRequest({
      requestId,
      status: account.createdAt && requestId ? "successful" : "failed",
    });
    return account;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
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
  let requestId;
  try {
    requestId = await createRequest("delete");

    const account = await getAccountById(accountId);
    if (account && account.status === "deleted") {
      if (requestId) {
        await updateRequest({
          requestId,
          status: "failed",
        });
      }
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
    return accountId;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
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
    return deleted;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
