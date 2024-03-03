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
exports.sendOrderUpdateToInventory = exports.addOrderToVendorWithProductBatches = exports.findOneOrderOfVendorByOrderId = exports.deleteOrderOfVendor = exports.editOrderOfVendor = exports.addOrderToVendor = exports.findOrderOfRestaurantWithProducts = exports.findOrderOfVendorWithAllProducts = exports.findOneOrderOfVendor = exports.findAllOrderOfVendor = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const productBatch_model_1 = __importDefault(require("../productBatch/productBatch.model"));
const axios_1 = __importDefault(require("axios"));
const vendor_query_1 = require("../vendor/vendor.query");
const vendor_model_1 = __importDefault(require("../vendor/vendor.model"));
const config_1 = __importDefault(require("../../config"));
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
function findOneOrderOfVendor(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield order_model_1.default.findOne({
                where: {
                    id: orderId,
                },
            });
            return order;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findOneOrderOfVendor = findOneOrderOfVendor;
function findOrderOfVendorWithAllProducts(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.findAll({
                where: {
                    vendorId,
                },
                include: [
                    {
                        model: productBatch_model_1.default,
                    },
                ],
            });
            return orders;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findOrderOfVendorWithAllProducts = findOrderOfVendorWithAllProducts;
function findOrderOfRestaurantWithProducts(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.findAll({
                where: {
                    restaurantId,
                },
                include: [
                    {
                        model: productBatch_model_1.default,
                    },
                    {
                        model: vendor_model_1.default,
                    },
                ],
            });
            return orders;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findOrderOfRestaurantWithProducts = findOrderOfRestaurantWithProducts;
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
            yield order_model_1.default.update(order, {
                where: {
                    id: orderId,
                },
            });
            const updatedOrder = yield findOneOrderOfVendor(orderId);
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
function findOneOrderOfVendorByOrderId(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.findOne({
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
function addOrderToVendorWithProductBatches(order, productBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield (0, vendor_query_1.findVendorById)(order.vendorId);
            if (vendor) {
                const newOrder = yield order_model_1.default.create(order);
                productBatches.forEach(productBatch => {
                    productBatch.orderId = newOrder.id;
                    productBatch.vendorId = newOrder.vendorId;
                    productBatch.restaurantId = newOrder.restaurantId;
                    productBatch.receivedAt = newOrder.orderDate;
                });
                yield productBatch_model_1.default.bulkCreate(productBatches);
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield sendOrderUpdateToInventory({ orderId: newOrder.id });
                }), 10000); // 10 sec timeout
                return newOrder;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.addOrderToVendorWithProductBatches = addOrderToVendorWithProductBatches;
function sendOrderUpdateToInventory(acceptOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield findOneOrderOfVendorByOrderId(acceptOrder.orderId);
            const transformedData = transformData(orders);
            const response = yield axios_1.default.post(`${config_1.default.HELPER_API}/v1/order/restaurant/${orders === null || orders === void 0 ? void 0 : orders.restaurantId}/ingredientBatches`, transformedData);
            console.log('sending order to inventory', response.data);
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.sendOrderUpdateToInventory = sendOrderUpdateToInventory;
function transformData(order) {
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
