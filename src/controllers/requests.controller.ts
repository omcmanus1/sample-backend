import { Request, Response } from "express";
import services from "../services";

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const allRequests = await services.requests.getAllRequests();
    return res.status(200).send(allRequests);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};

export const getRequestById = async (req: Request, res: Response) => {
  const { requestId } = req.params;
  if (!requestId) {
    return res.status(404).send({ error: "No ID provided." });
  }
  try {
    const requestEntry = await services.requests.getRequestById(requestId);
    return res.status(200).send(requestEntry);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
