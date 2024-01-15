"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const productBatch_model_1 = __importDefault(require("../productBatch/productBatch.model"));
;
const Product = __1.default.define('products', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    minimumOrderAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    volumeDiscount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    quantityUnit: {
        type: sequelize_1.DataTypes.ENUM('gm', 'ml', 'kg', 'litre', 'piece', 'bottle', 'packet', 'can'),
        allowNull: false,
    },
    qty: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    vendorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
Product.hasMany(productBatch_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'productId',
});
productBatch_model_1.default.belongsTo(Product, {
    foreignKey: 'productId',
});
exports.default = Product;
