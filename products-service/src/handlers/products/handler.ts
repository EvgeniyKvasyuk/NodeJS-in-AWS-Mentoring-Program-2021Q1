import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { sendResponse } from '../../utils';
import { productsService } from '../../service';
import { CustomError } from '../../customError';

const products = async () => {
  try {
    const result = await productsService.get();
    return sendResponse(result);
  } catch (error) {
    return sendResponse(new CustomError({ code: error.code }));
  }
};

export const main = middyfy(products);
