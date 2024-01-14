import { Router } from 'express';
import { getAllVendors, getAllVendorsWithProducts, postVendor, updateVendor, removeVendor, getVendorByName, getVendorByProductName, getVendorById } from '../controllers/vendor.controller';
const router = Router();

router.get('/', getAllVendors);
router.post('/', postVendor);
router.put('/:vendorId', updateVendor);
router.delete('/:vendorId', removeVendor);



export default router;