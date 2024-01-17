import { Router } from 'express';
import { getAllOrderOfVendor, PostOrderToVendor, UpdateOrderOfVendor, removeOrderOfVendor, 
    getOrderOfVendorWithAllProducts, postOrderToVendorWithProductBatches, sendOrderUpdateToInventoryService,
    getOrderOfVendorByOrderId } from '../controllers/order.controller';
const router = Router();

router.get('/vendor/:vendorId', getAllOrderOfVendor);
router.post('/vendor/:vendorId', PostOrderToVendor);
router.put('/vendor/:vendorId/:orderId', UpdateOrderOfVendor);
router.delete('/vendor/:vendorId/:orderId', removeOrderOfVendor);

router.get('/vendor/:vendorId/all', getOrderOfVendorWithAllProducts);
router.post('/vendor/:vendorId/all', postOrderToVendorWithProductBatches);

router.post('/vendor/:vendorId/send', sendOrderUpdateToInventoryService);
router.get('/vendor/:vendorId/order/:orderId', getOrderOfVendorByOrderId);

export default router;