import { Model, DataTypes, Optional } from 'sequelize';
import { IOrder } from '../../interfaces/order.interface';
import sequelize from '..';
import Product from '../product/product.model';
import ProductBatch from '../productBatch/productBatch.model';

interface OrderCreationAttributes extends Optional<IOrder, 'id'> {};

interface OrderInstance extends Model<IOrder, OrderCreationAttributes>, IOrder {
  createdAt?: Date;
  updatedAt?: Date;
}

const Order = sequelize.define<OrderInstance>('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
});

Order.hasMany(ProductBatch, {
  sourceKey: 'id',
  foreignKey: 'orderId'
});

ProductBatch.belongsTo(Order, {
  foreignKey: 'orderId'
});

export default Order;