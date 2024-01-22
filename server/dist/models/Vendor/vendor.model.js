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
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    contactNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    vendorType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'normal vendor',
    },
    workingDays: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: true,
    },
    bookedTimeSlots: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: true,
    },
    openingHours: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: true,
    },
    orderProcessingTime: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
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
