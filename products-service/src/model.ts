import { productsMock } from './mock';
import { ModelType, ProductType } from './types';

class ProductsModel {
  async findById(id: string) {
    const products = await this.findAll();
    return products.find((item) => item.id === id);
  }

  async findAll(): Promise<Array<ProductType>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsMock);
      }, 100);
    });
  }
}

export const productsModel: ModelType = new ProductsModel();
