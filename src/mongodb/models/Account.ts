import { Schema, model } from "mongoose";

const account = new Schema({
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
  createdAt: {
    type: Date,
    required: true,
    unique: false,
  },
  updatedAt: {
    type: Date,
    required: false,
    unique: false,
  },
  deletedAt: {
    type: Date,
    required: false,
    unique: false,
  },
});

const Account = model("Account", account);

export default Account;
