import mongoose from "mongoose";
// Define the schema for storing Shopify shop data
const shopSchema = new mongoose.Schema({
    shopId: Number,
    shopDomain: String,
    accessToken: String,
    installedAt: Date,
    shopName: String, // Optional: store the shop's name
    email: String, // Optional: store the shop owner's email
    // Add any other fields you might need
    // e.g., shop domain, email, etc.
});

// Create the model from the schema
export const Shop = mongoose.model('Shop', shopSchema);

