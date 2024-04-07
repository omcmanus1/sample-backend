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
    const createdAccount = await services.accounts.createAccount(accountDetails);
    return res.status(200).send(createdAccount);
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
    const deletedAccount = await services.accounts.deleteAccount(accountId);
    return res.status(200).send(deletedAccount);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
