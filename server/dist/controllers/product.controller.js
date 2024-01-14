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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductOfVendorBySearchTerm = exports.getAllProductsOfPlatformBySearchTerm = exports.removeProductOfVendor = exports.updateProductOfVendor = exports.postProductToVendor = exports.getAllProductOfVendor = void 0;
const product_query_1 = require("../models/product/product.query");
function getAllProductOfVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            const products = yield (0, product_query_1.findAllProductOfVendor)(vendorId);
            res.status(200).json({ data: products });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getAllProductOfVendor = getAllProductOfVendor;
function postProductToVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (vendorId) {
                const product = req.body;
                product.vendorId = vendorId;
                const newProduct = yield (0, product_query_1.addProductToVendor)(product);
                res.status(201).json(newProduct);
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.postProductToVendor = postProductToVendor;
function updateProductOfVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            const productId = Number(req.params.productId);
            if (vendorId && productId) {
                const product = req.body;
                product.vendorId = vendorId;
                const updatedProduct = yield (0, product_query_1.editProductOfVendor)(productId, product);
                res.status(200).json(updatedProduct);
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID or Product ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.updateProductOfVendor = updateProductOfVendor;
function removeProductOfVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            const productId = Number(req.params.productId);
            if (vendorId && productId) {
                const deletedProduct = yield (0, product_query_1.deleteProductOfVendor)(productId);
                res.status(200).json(deletedProduct);
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID or Product ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.removeProductOfVendor = removeProductOfVendor;
function getAllProductsOfPlatformBySearchTerm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchTerm = String(req.query.searchTerm);
            const products = yield (0, product_query_1.findAllProductsOfPlatformBySearchTerm)(searchTerm);
            res.status(200).json({ data: products });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getAllProductsOfPlatformBySearchTerm = getAllProductsOfPlatformBySearchTerm;
function getProductOfVendorBySearchTerm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            const searchTerm = String(req.query.searchTerm);
            const products = yield (0, product_query_1.findProductOfVendorBySearchTerm)(vendorId, searchTerm);
            res.status(200).json({ data: products });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getProductOfVendorBySearchTerm = getProductOfVendorBySearchTerm;
