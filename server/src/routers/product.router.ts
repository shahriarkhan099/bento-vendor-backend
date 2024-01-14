import { Router } from 'express';
import { getAllProductOfVendor, postProductToVendor, updateProductOfVendor, removeProductOfVendor, getAllProductsOfPlatformBySearchTerm, getProductOfVendorBySearchTerm } from '../controllers/product.controller';
const router = Router();

router.get('/vendor/:vendorId', getAllProductOfVendor);
router.post('/vendor/:vendorId', postProductToVendor);
router.put('/vendor/:vendorId/:productId', updateProductOfVendor);
router.delete('/vendor/:vendorId/:productId', removeProductOfVendor);
router.get('/vendor/:vendorId/search', getProductOfVendorBySearchTerm);

router.get('/search', getAllProductsOfPlatformBySearchTerm);

export default router;