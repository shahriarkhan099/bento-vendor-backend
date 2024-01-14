"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const order_model_1 = __importDefault(require("../order/order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
;
const Vendor = __1.default.define('vendors', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'normal vendor',
    },
    workingDays: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
    },
    openingHours: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
    },
    orderProcessingTime: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
Vendor.hasMany(product_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'vendorId'
});
product_model_1.default.belongsTo(Vendor);
Vendor.hasMany(order_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'vendorId'
});
order_model_1.default.belongsTo(Vendor);
exports.default = Vendor;
