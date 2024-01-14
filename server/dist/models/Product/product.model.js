"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const order_model_1 = __importDefault(require("../order/order.model"));
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
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    vendorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
Product.hasMany(order_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'productId'
});
order_model_1.default.belongsTo(Product);
exports.default = Product;
