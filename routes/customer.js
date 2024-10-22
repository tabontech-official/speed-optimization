import express from 'express'
import { customerDataDelete,customerDataRequest,NewShopData } from '../controller/customer.js'
const customerRouter=express.Router()
customerRouter.post('/shop_data_deletion',NewShopData)
customerRouter.post('/customer_data_deletion',customerDataDelete)
customerRouter.post('/customer_data_request' ,customerDataRequest)
export default customerRouter