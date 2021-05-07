import { CODES, DEFAULT_SUCCESS_RESULT } from './constants';
import { CustomError } from './customError';
import {
  ProductsModel,
  ProductsCountModel,
  ProductsCountModelType,
  ProductsModelType,
  ReturnedProductsModelType,
} from './models';
import { ResultType } from './types';
import { sequelize } from './connect';

export class ProductsService {
  products: ProductsModelType;
  productsCount: ProductsCountModelType;

  constructor(productsModel, productsCountModel) {
    this.products = productsModel;
    this.productsCount = productsCountModel;

    this.products.hasOne(this.productsCount);
    this.productsCount.belongsTo(this.products);
  }

  async existById(id: string, model, options) {
    try {
      // eslint-disable-next-line @typescript-eslint/return-await
      return await model.findByPk(id, options);
    } catch ({ code, message, stack }) {
      throw new CustomError({ code, message });
    }
  }

  async get(): Promise<ResultType<Array<ReturnedProductsModelType>> | InstanceType<typeof CustomError>> {
    try {
      const products = await this.products.findAll({
        include: {
          model: this.productsCount,
          as: 'count',
          attributes: ['count'],
        },
      });
      return { ...DEFAULT_SUCCESS_RESULT, data: products };
    } catch ({ code, message, stack }) {
      throw new CustomError({ code, message });
    }
  }

  async getById(id: string): Promise<ResultType<ReturnedProductsModelType> | InstanceType<typeof CustomError>> {
    try {
      const product = await this.existById(id, this.products, {
        include: {
          model: this.productsCount,
          as: 'count',
          attributes: ['count'],
        },
      });
      if (product) {
        return { ...DEFAULT_SUCCESS_RESULT, data: product };
      }
      throw new CustomError({ code: CODES.NOT_FOUND, message: 'Product not found' });
    } catch ({ code, message }) {
      throw new CustomError({
        message,
        code: code ?? CODES.SOMETHING_WENT_WRONG,
      });
    }
  }

  async add(title: string, description: string, price: number, count: number) {
    const transaction = await sequelize.transaction();
    try {
      const createdProduct:any = await this.products.create({ title, description, price }, { transaction });
      const createdProductCount:any = await this.productsCount.create(
        { productId: createdProduct.id, count },
        { transaction },
      );
      await transaction.commit();
      return {
        ...DEFAULT_SUCCESS_RESULT,
        data: {
          id: createdProduct.id,
          title: createdProduct.title,
          price: createdProduct.price,
          description: createdProduct.description,
          count: createdProductCount.count,
        },
      };
    } catch ({ code, message }) {
      await transaction.rollback();
      throw new CustomError({
        message,
        code: code ?? CODES.SOMETHING_WENT_WRONG,
      });
    }
  }
}

export const productsService = new ProductsService(ProductsModel, ProductsCountModel);
