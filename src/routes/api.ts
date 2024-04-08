import express from "express";
import controllers from "../controllers";

const router = express.Router();

// Query / Process Accounts
router.get("/accounts", controllers.accounts.getAccounts);
router.get("/:accountId/account", controllers.accounts.getAccountById);
router.post("/account", controllers.accounts.createAccount);
router.delete("/accounts", controllers.accounts.deleteAllAccounts);
router.delete(
  "/:accountId/account/soft-delete",
  controllers.accounts.softDeleteAccount
);
router.delete("/:accountId/account", controllers.accounts.deleteAccount);

// Query Requests
router.get("/requests", controllers.requests.getAllRequests);
router.get("/:requestId/request", controllers.requests.getRequestById);

export default router;
