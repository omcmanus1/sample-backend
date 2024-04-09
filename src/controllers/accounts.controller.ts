import { Request, Response } from "express";
import services from "../services";

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await services.accounts.getAccounts();
    return res.status(200).send(accounts);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
export const getAccountById = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  if (!accountId) {
    return res.status(404).send({ error: "No ID provided." });
  }
  try {
    const account = await services.accounts.getAccountById(accountId);
    if (!account) {
      return res.status(404).send({ error: "Account not found" });
    }
    return res.status(200).send(account);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};

export const createAccount = async (req: Request, res: Response) => {
  const accountDetails = req.body;
  if (!accountDetails) {
    return res.status(404).send({ error: "No data provided." });
  }
  try {
    const account = await services.accounts.createAccount(accountDetails);
    if (account) {
      return res.status(200).send({
        message: `Account ${account.username} created successfully`,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  if (!accountId) {
    return res.status(404).send({ error: "No ID provided." });
  }
  try {
    const deletionResult = await services.accounts.deleteAccount(accountId);
    if (deletionResult && !deletionResult.deletedCount) {
      return res.status(404).send({ error: "Account not found" });
    }
    return res.status(200).send({ message: "Account deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};

export const softDeleteAccount = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  if (!accountId) {
    return res.status(404).send({ error: "No ID provided." });
  }
  try {
    const deletionResult = await services.accounts.softDeleteAccount(accountId);
    return res
      .status(200)
      .send({ message: `Account ${deletionResult} soft-deleted successfully` });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};

export const deleteAllAccounts = async (req: Request, res: Response) => {
  try {
    const deletionResult = await services.accounts.deleteAllAccounts();
    if (deletionResult && !deletionResult.deletedCount) {
      return res.status(404).send({ error: "No accounts found" });
    }
    return res.status(200).send({ message: "Accounts deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
