import mongoose from "mongoose";
// Define the schema for storing Shopify shop data
const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
        unique: true // Ensure each shop is unique in the database
    },
    accessToken: {
        type: String,
        required: true // Access token is required for API calls
    },
    installedAt: {
        type: Date,
        default: Date.now // Automatically set the installation date
    },
    // Add any other fields you might need
    // e.g., shop domain, email, etc.
});

// Create the model from the schema
export const Shop = mongoose.model('Shop', shopSchema);

