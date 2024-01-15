import { Router } from 'express';
import { getAllOrderOfVendor, PostOrderToVendor, UpdateOrderOfVendor, removeOrderOfVendor, getOrderOfVendorWithAllProducts, postOrderToVendorWithProductBatches } from '../controllers/order.controller';
const router = Router();

router.get('/vendor/:vendorId', getAllOrderOfVendor);
router.post('/vendor/:vendorId', PostOrderToVendor);
router.put('/vendor/:vendorId/:orderId', UpdateOrderOfVendor);
router.delete('/vendor/:vendorId/:orderId', removeOrderOfVendor);

router.get('/vendor/:vendorId/all', getOrderOfVendorWithAllProducts);
router.post('/vendor/:vendorId/all', postOrderToVendorWithProductBatches);

export default router;