import mongoose from "mongoose";
const customerDataRequestSchema = new mongoose.Schema({
  customerId: { type: String },
  requestDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  data: { type: Object }, // Store the requested data
});

export const CustomerDataRequest = mongoose.model('CustomerDataRequest', customerDataRequestSchema);
