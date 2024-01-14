import { Router } from 'express';
import { getAllOrderOfVendor, PostOrderToVendor, UpdateOrderOfVendor, removeOrderOfVendor } from '../controllers/order.controller';
const router = Router();

router.get('/vendor/:vendorId', getAllOrderOfVendor);
router.post('/vendor/:vendorId', PostOrderToVendor);
router.put('/vendor/:vendorId/:orderId', UpdateOrderOfVendor);
router.delete('/vendor/:vendorId/:orderId', removeOrderOfVendor);

export default router;