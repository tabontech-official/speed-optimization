import mongoose from "mongoose";

const shopDataErasureSchema = new mongoose.Schema({
    shopId: { type: String, required: true },
    requestDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  });
  
export  const ShopDataErasure = mongoose.model('ShopDataErasure', shopDataErasureSchema);
  