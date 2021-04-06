import { codesToStatusCodesMap, HEADERS } from './constants';

export type ResultType<T> = {
  success: boolean,
  code: string,
  data: T,
};

export type ResponseType = {
  statusCode: Values<typeof codesToStatusCodesMap>,
  body: string,
  headers: typeof HEADERS,
};

export type ProductType = {
  id: string,
  title: string,
  price: string,
  description: string,
};

export type ModelType = {
  findAll: () => Promise<Array<ProductType>>
  findById: (id: string) => Promise<Maybe<ProductType>>
};
