import { Model, DataTypes, Optional } from 'sequelize';
import { IProduct } from '../../interfaces/product.interface'; 
import sequelize from '..';
import Order from '../Order/order.model';

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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.hasMany(Order, {
    sourceKey: 'id',
    foreignKey: 'productId'
});

Order.belongsTo(Product);

export default Product;
