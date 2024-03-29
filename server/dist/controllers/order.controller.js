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
exports.getOrderOfRestaurantWithProducts = exports.getOrderOfVendorByOrderId = exports.sendOrderUpdateToInventoryService = exports.postOrderToVendorWithProductBatches = exports.getOrderOfVendorWithAllProducts = exports.removeOrderOfVendor = exports.updateOrderOfVendor = exports.postOrderToVendor = exports.getAllOrderOfVendor = void 0;
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
function postOrderToVendor(req, res) {
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
exports.postOrderToVendor = postOrderToVendor;
function updateOrderOfVendor(req, res) {
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
exports.updateOrderOfVendor = updateOrderOfVendor;
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
function getOrderOfVendorWithAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (vendorId) {
                const orders = yield (0, order_query_1.findOrderOfVendorWithAllProducts)(vendorId);
                res.status(200).json({ data: orders });
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.getOrderOfVendorWithAllProducts = getOrderOfVendorWithAllProducts;
function postOrderToVendorWithProductBatches(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (vendorId) {
                const order = req.body;
                const productBatches = order.productBatches;
                order.vendorId = vendorId;
                const newOrder = yield (0, order_query_1.addOrderToVendorWithProductBatches)(order, productBatches);
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
exports.postOrderToVendorWithProductBatches = postOrderToVendorWithProductBatches;
function sendOrderUpdateToInventoryService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (vendorId) {
                const orderId = req.body;
                console.log("checking hit");
                yield (0, order_query_1.sendOrderUpdateToInventory)(orderId);
                res.status(201).json("Order Update Sent to Inventory Service.");
            }
            else
                res.status(400).json({ message: "Invalid Vendor ID." });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.sendOrderUpdateToInventoryService = sendOrderUpdateToInventoryService;
function getOrderOfVendorByOrderId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = Number(req.params.orderId);
            if (orderId) {
                const orders = yield (0, order_query_1.findOneOrderOfVendorByOrderId)(orderId);
                res.status(200).json({ data: orders });
            }
            else
                res.status(400).json({ message: "Invalid Order ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.getOrderOfVendorByOrderId = getOrderOfVendorByOrderId;
function getOrderOfRestaurantWithProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const orders = yield (0, order_query_1.findOrderOfRestaurantWithProducts)(restaurantId);
                res.status(200).json({ data: orders });
            }
            else
                res.status(400).json({ message: "Invalid Restaurant ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.getOrderOfRestaurantWithProducts = getOrderOfRestaurantWithProducts;
