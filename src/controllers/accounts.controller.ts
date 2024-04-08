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
  try {
    const createdAccount = await services.accounts.createAccount(
      accountDetails
    );
    return res
      .status(200)
      .send({
        message: `Account ${createdAccount.username} created successfully`,
      });
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
  try {
    const deletionResult = await services.accounts.deleteAccount(accountId);
    if (!deletionResult.deletedCount) {
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
