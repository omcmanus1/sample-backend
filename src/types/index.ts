export type Status = "pending" | "successful" | "failed";
export type OperationType = "create" | "update" | "delete";

export type AccountRequest = {
  id: string;
  accountId: string;
  type: OperationType;
  status: Status;
};
