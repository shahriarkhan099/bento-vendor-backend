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
exports.getAllVendorsWithProducts = exports.getVendorById = exports.getVendorByProductName = exports.getVendorByName = exports.removeVendor = exports.updateVendor = exports.postVendor = exports.getAllVendors = void 0;
const vendor_query_1 = require("../models/vendor/vendor.query");
function getAllVendors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendors = yield (0, vendor_query_1.findAllVendors)();
            res.status(200).json({ data: vendors });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getAllVendors = getAllVendors;
function postVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = req.body;
            const newVendor = yield (0, vendor_query_1.addVendor)(vendor);
            res.status(201).json(newVendor);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.postVendor = postVendor;
function updateVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (vendorId) {
                const vendor = req.body;
                const updatedVendor = yield (0, vendor_query_1.editVendor)(vendorId, vendor);
                res.status(200).json(updatedVendor);
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.updateVendor = updateVendor;
function removeVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (vendorId) {
                const deletedVendor = yield (0, vendor_query_1.deleteVendor)(vendorId);
                res.status(200).json(deletedVendor);
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.removeVendor = removeVendor;
function getVendorByName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchTerm = String(req.query.searchTerm);
            const vendors = yield (0, vendor_query_1.findVendorByName)(searchTerm);
            res.status(200).json({ data: vendors });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getVendorByName = getVendorByName;
function getVendorByProductName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchTerm = String(req.query.searchTerm);
            const vendors = yield (0, vendor_query_1.findVendorByProductName)(searchTerm);
            res.status(200).json({ data: vendors });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getVendorByProductName = getVendorByProductName;
function getVendorById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (vendorId) {
                const vendor = yield (0, vendor_query_1.findVendorById)(vendorId);
                res.status(200).json({ data: vendor });
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getVendorById = getVendorById;
function getAllVendorsWithProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendors = yield (0, vendor_query_1.findAllVendorsWithProducts)();
            res.status(200).json({ data: vendors });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getAllVendorsWithProducts = getAllVendorsWithProducts;
