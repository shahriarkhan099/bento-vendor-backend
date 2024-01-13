import { Model, DataTypes, Optional } from 'sequelize';
import { IVendor } from '../../interfaces/vendor.interface'; 
import sequelize from '..';
import Order from '../Order/order.model';
import Product from '../Product/product.model';

interface VendorCreationAttributes extends Optional<IVendor, 'id'> {};

interface VendorInstance extends Model<IVendor, VendorCreationAttributes>, IVendor {
  createdAt?: Date;
  updatedAt?: Date;
}

const Vendor = sequelize.define<VendorInstance>('vendors', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workingDays: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: false,
  },
  openingHours: {
    type: DataTypes.JSONB, 
    allowNull: false,
  },
  orderProcessingTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Vendor.hasMany(Product, {
    sourceKey: 'id',
    foreignKey: 'vendorId'
});

Order.belongsTo(Vendor);

Vendor.hasMany(Order, {
    sourceKey: 'id',
    foreignKey: 'vendorId'
});

Order.belongsTo(Vendor);

export default Vendor;
