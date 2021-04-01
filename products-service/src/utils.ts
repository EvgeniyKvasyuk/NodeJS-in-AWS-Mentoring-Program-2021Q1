import { codesToStatusCodesMap, DEFAULT_SUCCESS_STATUS } from './constants';
import { ResultType, ResponseType } from './types';
import { CustomError } from './customError';

export const sendResponse = <Data>(result: ResultType<Data>| InstanceType<typeof CustomError>): ResponseType => {
  return {
    statusCode: codesToStatusCodesMap[result?.code || DEFAULT_SUCCESS_STATUS],
    body: JSON.stringify(result),
  };
};
