"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
;
const ProductBatch = __1.default.define('productBatches', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    uniqueIngredientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    purchaseQuantity: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    unitOfStock: {
        type: sequelize_1.DataTypes.ENUM('gm', 'ml', 'kg', 'litre', 'piece', 'bottle', 'packet', 'can'),
        allowNull: false,
    },
    purchasePrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    receivedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    expirationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    vendorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = ProductBatch;
