import { Schema, model } from "mongoose";

const account = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    deletedAt: {
      type: Date,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);

const Account = model("Account", account);

export default Account;
