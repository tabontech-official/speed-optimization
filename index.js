import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './connection/db_Connection.js';
import authRouter from './pages/auth.js'; 
import authCallbackRouter from './pages/callBack.js';

dotenv.config();
const app = express();
dbConnection();

app.use(express.json());
app.use('/api', authRouter); // Use auth routes under /api
app.use('/api', authCallbackRouter);

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Shopify App API!');
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
