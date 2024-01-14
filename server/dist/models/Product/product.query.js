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
exports.findAllProductsOfPlatformBySearchTerm = exports.findProductOfVendorBySearchTerm = exports.deleteProductOfVendor = exports.editProductOfVendor = exports.addProductToVendor = exports.findAllProductOfVendor = void 0;
const sequelize_1 = require("sequelize");
const product_model_1 = __importDefault(require("./product.model"));
const vendor_model_1 = __importDefault(require("../vendor/vendor.model"));
function findAllProductOfVendor(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield product_model_1.default.findAll({
                where: {
                    vendorId,
                },
            });
            return products;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllProductOfVendor = findAllProductOfVendor;
function addProductToVendor(product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newProduct = yield product_model_1.default.create(product);
            return newProduct;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.addProductToVendor = addProductToVendor;
function editProductOfVendor(productId, product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedProduct = yield product_model_1.default.update(product, {
                where: {
                    id: productId,
                },
            });
            return updatedProduct;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.editProductOfVendor = editProductOfVendor;
function deleteProductOfVendor(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedProduct = yield product_model_1.default.destroy({
                where: {
                    id: productId,
                },
            });
            return deletedProduct;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.deleteProductOfVendor = deleteProductOfVendor;
function findProductOfVendorBySearchTerm(vendorId, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield product_model_1.default.findAll({
                where: {
                    vendorId,
                    name: {
                        [sequelize_1.Op.like]: `%${searchTerm}%`,
                    },
                },
                include: [vendor_model_1.default]
            });
            return products;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findProductOfVendorBySearchTerm = findProductOfVendorBySearchTerm;
function findAllProductsOfPlatformBySearchTerm(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield product_model_1.default.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.like]: `%${searchTerm}%`,
                    },
                },
                include: [vendor_model_1.default]
            });
            return products;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllProductsOfPlatformBySearchTerm = findAllProductsOfPlatformBySearchTerm;
