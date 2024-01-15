import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '..';
import { IProductBatch } from '../../interfaces/productBatch.interface';

interface ProductBatchCreationAttributes extends Optional<IProductBatch, 'id'> {};

interface ProductBatchInstance extends Model<IProductBatch, ProductBatchCreationAttributes>, IProductBatch {
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductBatch = sequelize.define<ProductBatchInstance>('productBatches', {
    id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: DataTypes.INTEGER,
       unique: true,
    },
    ProductName: {
       type: DataTypes.STRING,
       allowNull: false,
    },
    purchaseQuantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    purchasePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    receivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expirationDate: {
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
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default ProductBatch;