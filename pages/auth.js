import express from 'express';

const router = express.Router();
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;

router.get('/auth', (req, res) => {
    const { shop } = req.query;
    if (!shop) return res.status(400).send('Missing shop parameter.');

    const redirectUri = `https://${req.headers.host}/api/auth/callback`;
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,write_products&redirect_uri=${redirectUri}`;
    
    res.redirect(installUrl);
});

export default router;
