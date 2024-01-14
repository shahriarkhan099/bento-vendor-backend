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
exports.removeOrderOfVendor = exports.UpdateOrderOfVendor = exports.PostOrderToVendor = exports.getAllOrderOfVendor = void 0;
const order_query_1 = require("../models/order/order.query");
function getAllOrderOfVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            const orders = yield (0, order_query_1.findAllOrderOfVendor)(vendorId);
            res.status(200).json({ data: orders });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.getAllOrderOfVendor = getAllOrderOfVendor;
function PostOrderToVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (vendorId) {
                const order = req.body;
                order.vendorId = vendorId;
                const newOrder = yield (0, order_query_1.addOrderToVendor)(order);
                res.status(201).json(newOrder);
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.PostOrderToVendor = PostOrderToVendor;
function UpdateOrderOfVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            const orderId = Number(req.params.orderId);
            if (vendorId && orderId) {
                const order = req.body;
                order.vendorId = vendorId;
                const updatedOrder = yield (0, order_query_1.editOrderOfVendor)(orderId, order);
                res.status(200).json(updatedOrder);
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID or Order ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.UpdateOrderOfVendor = UpdateOrderOfVendor;
function removeOrderOfVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            const orderId = Number(req.params.orderId);
            if (vendorId && orderId) {
                const deletedOrder = yield (0, order_query_1.deleteOrderOfVendor)(orderId);
                res.status(200).json(deletedOrder);
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID or Order ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.removeOrderOfVendor = removeOrderOfVendor;
