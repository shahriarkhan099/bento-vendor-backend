import { Model, DataTypes, Optional } from 'sequelize';
import { IVendor } from '../../interfaces/vendor.interface'; 
import sequelize from '..';
import Order from '../order/order.model';
import Product from '../product/product.model';

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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vendorType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal vendor',
  },
  workingDays: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: true,
  },
  bookedTimeSlots: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: true,
  },
  openingHours: {
    type: DataTypes.JSONB, 
    allowNull: true,
  },
  orderProcessingTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Vendor.hasMany(Product, {
    sourceKey: 'id',
    foreignKey: 'vendorId'
});

Product.belongsTo(Vendor);

Vendor.hasMany(Order, {
    sourceKey: 'id',
    foreignKey: 'vendorId'
});

Order.belongsTo(Vendor);

export default Vendor;
