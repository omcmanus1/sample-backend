import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String },
  },
  { timestamps: true }
);

const Account = model("Account", accountSchema);

export default Account;
