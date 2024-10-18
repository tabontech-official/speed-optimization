import express from 'express';
import axios from 'axios';

const router = express.Router();
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;

router.get('/callback', async (req, res) => {
    const { shop, code } = req.query;

    const tokenUrl = `https://${shop}/admin/oauth/access_token`;
    const params = {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code,
    };

    try {
        const response = await axios.post(tokenUrl, params);
        const accessToken = response.data.access_token;
        res.redirect(`/dashboard?accessToken=${accessToken}`); // Or handle it as you need
    } catch (error) {
        res.status(500).send('Error retrieving access token.');
    }
});

export default router;
