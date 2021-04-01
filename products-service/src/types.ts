import { codesToStatusCodesMap } from './constants';

export type ResultType<T> = {
  success: boolean,
  code: string,
  data: T,
};

export type ResponseType = {
  statusCode: Values<typeof codesToStatusCodesMap>,
  body: string,
};

export type ProductType = {
  id: string,
  name: string,
  price: string,
};

export type ModelType = {
  findAll: () => Promise<Array<ProductType>>
  findById: (id: string) => Promise<Maybe<ProductType>>
};
