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
