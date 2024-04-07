import express from "express";
import controllers from "../controllers";

const router = express.Router();

// Accounts Processing
router.get("/accounts", controllers.accounts.getAccounts);
router.get("/:accountId/account", controllers.accounts.getAccountById);
router.post("/account", controllers.accounts.createAccount);
router.delete("/:accountId/account", controllers.accounts.deleteAccount);

export default router;
