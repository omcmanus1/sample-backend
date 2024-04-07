import moment from "moment";
import Account from "../mongodb/models/Account";

type AccountDetails = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
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
  try {
    const createdAccount = await Account.create({
      ...accountDetails,
      createdAt: moment().format(),
    });
    return createdAccount;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const deleteAccount = async (accountId: string) => {
  try {
    const deletedAccount = await Account.deleteOne({ _id: accountId });
    return deletedAccount;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
