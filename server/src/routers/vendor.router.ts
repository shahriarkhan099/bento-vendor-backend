import { Router } from 'express';
import { getAllVendors, postVendor, updateVendor, removeVendor, getVendorByName, getVendorByProductName, getAllVendorsWithProducts, getVendorById } from '../controllers/vendor.controller';
const router = Router();

router.get('/', getAllVendors);
router.post('/', postVendor);
router.put('/:vendorId', updateVendor);
router.delete('/:vendorId', removeVendor);
router.get('/search', getVendorByName);

router.get('/search/product', getVendorByProductName);
router.get('/products', getAllVendorsWithProducts);
router.get('/:vendorId', getVendorById);



export default router;