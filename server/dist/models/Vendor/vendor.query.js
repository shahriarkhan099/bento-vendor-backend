"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVendorsByNameAndProductName = exports.findVendorByIdWithProducts = exports.findVendorById = exports.findVendorByProductName = exports.findVendorByName = exports.deleteVendor = exports.editVendor = exports.addVendor = exports.findAllVendorsWithProducts = exports.findAllVendors = void 0;
const sequelize_1 = require("sequelize");
const vendor_model_1 = __importDefault(require("./vendor.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
function findAllVendors() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendors = yield vendor_model_1.default.findAll();
            return vendors;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllVendors = findAllVendors;
function findAllVendorsWithProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendors = yield vendor_model_1.default.findAll({
                include: [
                    {
                        model: product_model_1.default,
                    },
                ],
            });
            return vendors;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllVendorsWithProducts = findAllVendorsWithProducts;
function addVendor(vendor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newVendor = yield vendor_model_1.default.create(vendor);
            return newVendor;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.addVendor = addVendor;
function editVendor(vendorId, vendor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedVendor = yield vendor_model_1.default.update(vendor, {
                where: {
                    id: vendorId,
                },
            });
            return updatedVendor;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.editVendor = editVendor;
function deleteVendor(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedVendor = yield vendor_model_1.default.destroy({
                where: {
                    id: vendorId,
                },
            });
            return deletedVendor;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.deleteVendor = deleteVendor;
function findVendorByName(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendors = yield vendor_model_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            name: {
                                [sequelize_1.Op.iLike]: `%${searchTerm}%`,
                            },
                        }
                    ],
                },
            });
            return vendors;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findVendorByName = findVendorByName;
function findVendorByProductName(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendors = yield vendor_model_1.default.findAll({
                include: [
                    {
                        model: product_model_1.default,
                        where: {
                            name: {
                                [sequelize_1.Op.iLike]: `%${searchTerm}%`,
                            },
                        },
                    },
                ],
            });
            return vendors;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findVendorByProductName = findVendorByProductName;
function findVendorById(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield vendor_model_1.default.findByPk(vendorId);
            return vendor;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findVendorById = findVendorById;
function findVendorByIdWithProducts(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield vendor_model_1.default.findByPk(vendorId, {
                include: [
                    {
                        model: product_model_1.default,
                    },
                ],
            });
            return vendor;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findVendorByIdWithProducts = findVendorByIdWithProducts;
function findVendorsByNameAndProductName(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorsByNamePromise = findVendorByName(searchTerm);
            const vendorsByProductNamePromise = findVendorByProductName(searchTerm);
            const [vendorsByName, vendorsByProductName] = yield Promise.all([vendorsByNamePromise, vendorsByProductNamePromise]);
            const uniqueVendors = [...vendorsByName, ...vendorsByProductName].reduce((acc, vendor) => {
                if (!acc.has(vendor.id)) {
                    acc.set(vendor.id, vendor);
                }
                return acc;
            }, new Map()).values();
            return Array.from(uniqueVendors);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findVendorsByNameAndProductName = findVendorsByNameAndProductName;
