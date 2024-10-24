import { CustomerDataRequest } from "../model/customer.js";
import { ShopDataErasure } from "../model/shop.js";


export const customerDataRequest=async(req,res)=>{
    const { customerId } = req.body;

    try {
      const request = new CustomerDataRequest({ customerId });
      await request.save();
  
      // Fetch the customer data and process it
      const customerData = await customerDataRequest.findOne(customerId); // Implement this function based on your data source
  
      // Update the request status and data
      request.data = customerData;
      request.status = 'completed';
      await request.save();
  
      // Respond with the customer data (if required)
      res.json(customerData);
    } catch (error) {
      console.error('Error handling customer data request:', error);
      res.sendStatus(500); // Internal Server Error
    }
}

export const customerDataDelete=async(req,res)=>{
    const { customerId } = req.body;

    try {
      // Store the erasure request in the database
      const erasureRequest = new CustomerDataErasure({ customerId });
      await erasureRequest.save();
  
      // Implement your logic to delete customer data
      await CustomerDataRequest.deleteOne({customerId}); // Implement this function based on your data source
  
      // Update the request status
      erasureRequest.status = 'completed';
      await erasureRequest.save();
  
      res.sendStatus(200); // OK
    } catch (error) {
      console.error('Error handling customer data deletion:', error);
      res.sendStatus(500); // Internal Server Error
    }
}


// export const NewShopData=async(req,res)=>{
//     const { shopId } = req.body;

//   try {
//     // Store the erasure request in the database
//     const shopErasureRequest = new ShopDataErasure({ shopId });
//     await shopErasureRequest.save();

//     // Implement your logic to delete shop data
//     await shopErasureRequest.deleteOne(shopId); // Implement this function based on your data source

//     // Update the request status
//     shopErasureRequest.status = 'completed';
//     await shopErasureRequest.save();

//     res.sendStatus(200); // OK
//   } catch (error) {
//     console.error('Error handling shop data deletion:', error);
//     res.sendStatus(500); // Internal Server Error
//   }
// }


export const NewShopData=async(req,res)=>{
  const { shopId } = req.body;

try {
  // Store the erasure request in the database
  
  // Implement your logic to delete shop data
  await Shop.deleteOne({shopId}); // Implement this function based on your data source

  // Update the request status


  res.sendStatus(200); // OK
} catch (error) {
  console.error('Error handling shop data deletion:', error);
  res.sendStatus(500); // Internal Server Error
}
}


const registerWebhooks = async (shop, accessToken) => {
  const webhookData = [
    {
      topic: 'customers/data_request',
      address: 'https://your-app-url.com/customer-data-request',
      format: 'json',
    },
    {
      topic: 'customers/redact',
      address: 'https://your-app-url.com/customer-data-delete',
      format: 'json',
    },
    {
      topic: 'shop/redact',
      address: 'https://your-app-url.com/new-shop-data',
      format: 'json',
    },
  ];

  try {
    const promises = webhookData.map((webhook) => {
      return axios.post(
        `https://${shop}/admin/api/2023-04/webhooks.json`,
        {
          webhook: {
            topic: webhook.topic,
            address: webhook.address,
            format: webhook.format,
          },
        },
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        }
      );
    });

    await Promise.all(promises);
    console.log('Webhooks registered successfully');
  } catch (error) {
    console.error('Error registering webhooks:', error);
  }
};

 