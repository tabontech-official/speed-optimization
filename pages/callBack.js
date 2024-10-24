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
      // Step 1: Get the access token from Shopify
      const response = await axios.post(tokenUrl, params);
      const accessToken = response.data.access_token;
  
      // Step 2: Fetch shop details to get the shopId and other info
      const shopDetailsResponse = await axios.get(`https://${shop}/admin/api/2023-10/shop.json`, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      });
  
      const shopDetails = shopDetailsResponse.data.shop;
      const shopId = shopDetails.id; // Extract the shopId from the shop details
  
      // Step 3: Store shop data in MongoDB
      const shopData = new Shop({
        shopId: shopId, // Store the Shopify shop ID
        shopDomain: shop,
        accessToken: accessToken,
        installedAt: new Date(),
        shopName: shopDetails.name, // Example of saving more details like the shop name
        email: shopDetails.email,
      });
  
      await shopData.save(); // Save shop data to MongoDB
  
      // Redirect to your app's dashboard or welcome page
      res.redirect('https://admin.shopify.com/store/sonipracticestore/apps/app-1386/InsightReports'); // Customize this path
  
    } catch (error) {
      console.error('Error retrieving access token or shop details:', error);
      res.status(500).send('Error retrieving access token or shop details.');
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
