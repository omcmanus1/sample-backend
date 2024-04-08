import { Schema, model } from "mongoose";

const requestSchema = new Schema({
  requestId: { type: String },
  accountId: { type: String },
  type: { type: String, required: true },
  status: { type: String, required: true },
});

const Request = model("Request", requestSchema);

export default Request;
