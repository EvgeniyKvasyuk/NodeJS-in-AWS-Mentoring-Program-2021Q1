import { CODES, DEFAULT_SUCCESS_RESULT } from './constants';
import { CustomError } from './customError';
import { productsModel } from './model';
import { ProductType, ModelType, ResultType } from './types';

export class ProductsService {
  products: ModelType;

  constructor(model: ModelType) {
    this.products = model;
  }

  async existById(id: string): Promise<Maybe<ProductType>> {
    try {
      return await this.products.findById(id);
    } catch ({ code, message, stack }) {
      throw new CustomError({ code, message });
    }
  }

  async get(): Promise<ResultType<Array<ProductType>> | InstanceType<typeof CustomError>> {
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

  async getById(id: string): Promise<ResultType<ProductType> | InstanceType<typeof CustomError>> {
    try {
      const user = await this.existById(id);
      if (user) {
        return { ...DEFAULT_SUCCESS_RESULT, data: user };
      }
      throw new CustomError({ code: CODES.NOT_FOUND, message: 'Product not found' });
    } catch ({ code, message }) {
      throw new CustomError({
        message,
        code: code ?? CODES.SOMETHING_WENT_WRONG,
      });
    }
  }
}

export const productsService = new ProductsService(productsModel);
