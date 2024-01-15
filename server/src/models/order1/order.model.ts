import { Model, DataTypes, Optional } from 'sequelize';
import { IOrder } from '../../interfaces/order.interface';
import sequelize from '..';

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
      totalQuantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantityUnit: {
        type: DataTypes.ENUM('gm', 'ml', 'piece', 'kg', 'litre'),
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      vendorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
});

export default Order;