import { Model, DataTypes, Optional } from 'sequelize';
import { IProduct } from '../../interfaces/product.interface'; 
import sequelize from '..';
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
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  minimumOrderAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unitOfStock: {
    type: DataTypes.ENUM('gm', 'ml', 'kg', 'litre', 'piece', 'bottle', 'packet', 'can'),
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  volumeDiscount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
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
