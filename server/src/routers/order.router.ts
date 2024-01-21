import { Router } from 'express';
import { getAllOrderOfVendor, postOrderToVendor, updateOrderOfVendor, removeOrderOfVendor, 
    getOrderOfVendorWithAllProducts, postOrderToVendorWithProductBatches, sendOrderUpdateToInventoryService,
    getOrderOfVendorByOrderId, getOrderOfRestaurantWithProducts } from '../controllers/order.controller';
const router = Router();

router.get('/vendor/:vendorId', getAllOrderOfVendor);
router.post('/vendor/:vendorId', postOrderToVendor);
router.put('/vendor/:vendorId/:orderId', updateOrderOfVendor);
router.delete('/vendor/:vendorId/:orderId', removeOrderOfVendor);

router.get('/vendor/:vendorId/all', getOrderOfVendorWithAllProducts);
router.post('/vendor/:vendorId/all', postOrderToVendorWithProductBatches);

router.post('/vendor/:vendorId/send', sendOrderUpdateToInventoryService);
router.get('/vendor/:vendorId/order/:orderId', getOrderOfVendorByOrderId);
router.get('/restaurant/:restaurantId', getOrderOfRestaurantWithProducts);

export default router;