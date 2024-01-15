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
exports.findOrderOfVendorWithAllProducts = exports.deleteOrderOfVendor = exports.editOrderOfVendor = exports.addOrderToVendor = exports.findAllOrderOfVendor = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const productBatch_model_1 = __importDefault(require("../productBatch/productBatch.model"));
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
