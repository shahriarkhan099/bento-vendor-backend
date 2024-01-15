import { Model, DataTypes, Optional } from 'sequelize';
import { IProduct } from '../../interfaces/product.interface'; 
import sequelize from '..';
import Order from '../order/order.model';
import ProductBatch from '../productBatch/productBatch.model';

interface ProductCreationAttributes extends Optional<IProduct, 'id'> {};

interface ProductInstance extends Model<IProduct, ProductCreationAttributes>, IProduct {
  createdAt?: Date;
  updatedAt?: Date;
}

const Product = sequelize.define<ProductInstance>('products', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  minimumOrderAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  volumeDiscount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantityUnit: {
    type: DataTypes.ENUM('gm', 'ml', 'kg', 'litre', 'piece', 'bottle', 'packet', 'can'),
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.hasMany(ProductBatch, {
  sourceKey: 'id',
  foreignKey: 'productId',
});

ProductBatch.belongsTo(Product, {
  foreignKey: 'productId',
});

export default Product;
