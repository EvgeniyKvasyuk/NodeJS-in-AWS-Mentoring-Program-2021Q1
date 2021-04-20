import {
  DataTypes,
  ModelDefined,
  Optional,
} from 'sequelize';

import { sequelize } from '../connect';

export interface ProductsCountInterface {
  id: number,
  count: number,
  productId: number,
}

interface ProductsCountCreationInterface extends Optional<ProductsCountInterface, 'id'> {}

export type ProductsCountModelType = ModelDefined<ProductsCountInterface, ProductsCountCreationInterface>;

export const ProductsCountModel: ProductsCountModelType = sequelize.define('count', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'counts',
});
