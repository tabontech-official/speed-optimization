import express from 'express';
import axios from 'axios';
import { Shop } from '../model/shopSchema.js';

const router = express.Router();
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;

router.get('/callback', async (req, res) => {
    const { shop, code } = req.query;

    if (!shop || !code) {
        return res.status(400).send('Missing shop or code parameter.');
    }

    const tokenUrl = `https://${shop}/admin/oauth/access_token`;
    const params = {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code,
    };

    try {
        // Step 1: Exchange code for access token
        const response = await axios.post(tokenUrl, params);
        const accessToken = response.data.access_token;

        // Step 2: Use access token to fetch shop data
        const shopDataResponse = await axios.get(`https://${shop}/admin/api/2024-10/shop.json`, {
            headers: {
                'X-Shopify-Access-Token': accessToken,
            },
        });

        // Extract shop information
        const shopData = shopDataResponse.data.shop;
        
        // Step 3: Save to MongoDB
        const newShop = new Shop({
            shopId: shopData.id,
            shopDomain: shopData.domain,
            accessToken: accessToken,
            installedAt: new Date(),
            shopName: shopData.name,
            email: shopData.email,
        });

        await newShop.save();

        res.redirect('/');
    } catch (error) {
        console.error('Error retrieving shop data or saving to MongoDB:', error.response?.data || error.message);
        res.status(500).send('Error retrieving shop data or saving to MongoDB.');
    }
});



export default router;
