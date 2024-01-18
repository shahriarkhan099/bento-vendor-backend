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
exports.sendOrderUpdateToInventory = exports.findOneOrderOfVendorByOrderId = exports.addOrderToVendorWithProductBatches = exports.findOrderOfVendorWithAllProducts = exports.deleteOrderOfVendor = exports.editOrderOfVendor = exports.addOrderToVendor = exports.findAllOrderOfVendor = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const productBatch_model_1 = __importDefault(require("../productBatch/productBatch.model"));
const axios_1 = __importDefault(require("axios"));
const vendor_query_1 = require("../vendor/vendor.query");
function findAllOrderOfVendor(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.findAll({
                where: {
                    vendorId,
                },
            });
            return orders;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllOrderOfVendor = findAllOrderOfVendor;
function addOrderToVendor(order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newOrder = yield order_model_1.default.create(order);
            return newOrder;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.addOrderToVendor = addOrderToVendor;
function editOrderOfVendor(orderId, order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedOrder = yield order_model_1.default.update(order, {
                where: {
                    id: orderId,
                },
            });
            return updatedOrder;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.editOrderOfVendor = editOrderOfVendor;
function deleteOrderOfVendor(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedOrder = yield order_model_1.default.destroy({
                where: {
                    id: orderId,
                },
            });
            return deletedOrder;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.deleteOrderOfVendor = deleteOrderOfVendor;
function findOrderOfVendorWithAllProducts(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.findAll({
                where: {
                    vendorId,
                },
                include: {
                    model: productBatch_model_1.default,
                },
            });
            return orders;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findOrderOfVendorWithAllProducts = findOrderOfVendorWithAllProducts;
function addOrderToVendorWithProductBatches(order, productBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield (0, vendor_query_1.findVendorById)(order.vendorId);
            if (vendor) {
                let deliveryTime = new Date();
                deliveryTime.setHours(deliveryTime.getHours() + vendor.orderProcessingTime);
                order.deliveryDate = deliveryTime;
                const newOrder = yield order_model_1.default.create(order);
                productBatches.forEach(productBatch => {
                    productBatch.orderId = newOrder.id;
                    productBatch.vendorId = newOrder.vendorId;
                    productBatch.restaurantId = newOrder.restaurantId;
                    productBatch.receivedAt = newOrder.orderDate;
                });
                yield productBatch_model_1.default.bulkCreate(productBatches);
                return newOrder;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.addOrderToVendorWithProductBatches = addOrderToVendorWithProductBatches;
function findOneOrderOfVendorByOrderId(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.findAll({
                where: {
                    id: orderId,
                },
                include: {
                    model: productBatch_model_1.default,
                },
            });
            console.log(orders);
            return orders;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findOneOrderOfVendorByOrderId = findOneOrderOfVendorByOrderId;
function sendOrderUpdateToInventory(acceptOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(acceptOrder);
            const orders = yield findOneOrderOfVendorByOrderId(acceptOrder.orderId);
            console.log(orders);
            const transformedData = transformData(orders);
            const response = yield axios_1.default.post('http://localhost:4000/v1/order/restaurant/1/ingredientBatches', transformedData);
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.sendOrderUpdateToInventory = sendOrderUpdateToInventory;
function transformData(orders) {
    const order = orders[0];
    const { status, deliveryDate, vendorId, productBatches } = order;
    const ingredientBatches = productBatches.map((productBatch) => {
        return {
            uniqueIngredientId: productBatch.uniqueIngredientId,
            ingredientName: productBatch.productName,
            unitOfStock: productBatch.unitOfStock,
            purchaseQuantity: productBatch.purchaseQuantity,
            purchasePrice: productBatch.purchasePrice,
            expirationDate: productBatch.expirationDate,
        };
    });
    const transformedData = {
        status,
        deliveryDate,
        supplierId: vendorId,
        ingredientBatches,
    };
    return transformedData;
}
