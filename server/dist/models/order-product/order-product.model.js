"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
;
const OrderProduct = __1.default.define('order-product', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
});
exports.default = OrderProduct;
