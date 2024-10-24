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
        const response = await axios.post(tokenUrl, params);
        const accessToken = response.data.access_token;

        // Optionally store the access token securely (e.g., database or session)
        // const shopData = new Shop({
        //     shopName: shop,
        //     accessToken: accessToken,
        //     installedAt: new Date()
        // });
        // await shopData.save();
        // Redirect to the welcome page
        res.redirect('/');
    } catch (error) {
        console.error('Error retrieving access token:', error);
        res.status(500).send('Error retrieving access token.');
    }
});

// const router = express.Router();
// const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
// const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;

// router.get('/callback', async (req, res) => {
//     const { shop, code } = req.query;

//     if (!shop || !code) {
//         return res.status(400).send('Missing shop or code parameter.');
//     }

//     const tokenUrl = `https://${shop}/admin/oauth/access_token`;
//     const params = {
//         client_id: SHOPIFY_API_KEY,
//         client_secret: SHOPIFY_API_SECRET,
//         code,
//     };

//     try {
//         // Step 1: Get the access token
//         const response = await axios.post(tokenUrl, params);
//         const accessToken = response.data.access_token;

//         // Step 2: Fetch shop details to get the shopId
//         const shopDetailsResponse = await axios.get(`https://${shop}/admin/api/2023-10/shop.json`, {
//             headers: {
//                 'X-Shopify-Access-Token': accessToken,
//             },
//         });

//         const shopId = shopDetailsResponse.data.shop.id; // Extract the shopId

//         // Step 3: Store shop data in MongoDB
//         const shopData = new Shop({
//             shopId: shopId, // Store the shopId
//             shopName: shop,
//             accessToken: accessToken,
//             installedAt: new Date(),
//         });

//         await shopData.save();

//         // Redirect to the welcome page or dashboard
//         res.redirect('/');
//     } catch (error) {
//         console.error('Error retrieving access token or shop details:', error);
//         res.status(500).send('Error retrieving access token or shop details.');
//     }
// });

export default router;
