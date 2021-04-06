import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { sendResponse } from '../../utils';
import { productsService } from '../../service';

const products = async () => {
  try {
    const result = await productsService.get();
    return sendResponse(result);
  } catch (error) {
    console.log(error);
    return sendResponse(error);
  }
};

export const main = middyfy(products);
