import mongoose from "mongoose";

const customerDataErasureSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    requestDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    customerData:[String]
  });
  
 export const CustomerDataErasure = mongoose.model('CustomerDataErasure', customerDataErasureSchema);
  