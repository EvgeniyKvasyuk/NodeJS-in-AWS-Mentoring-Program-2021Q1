import {
  DataTypes,
  ModelDefined,
  Optional,
  Model,
} from 'sequelize';

import { sequelize } from '../connect';

export interface ProductsInterface {
  id: number,
  title: string,
  description: string,
  price: number,
}

interface ProductsCreationInterface extends Optional<ProductsInterface, 'id'> {}

export type ProductsModelType = ModelDefined<ProductsInterface, ProductsCreationInterface>;
export type ReturnedProductsModelType = Model<ProductsInterface, ProductsCreationInterface>;
export const ProductsModel: ProductsModelType = sequelize.define('product', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: false,
  },
}, {
  timestamps: false,
  tableName: 'products',
});
