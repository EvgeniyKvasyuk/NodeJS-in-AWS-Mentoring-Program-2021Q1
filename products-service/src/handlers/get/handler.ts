import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { sendResponse } from '../../utils';
import { ProductsService } from '../../service';
import { ProductsCountModel, ProductsModel } from '../../models';

export const productsService = new ProductsService(ProductsModel, ProductsCountModel);

const get = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('get', event);
  try {
    const result = await productsService.get();
    return sendResponse(result);
  } catch (error) {
    console.log(error);
    return sendResponse(error);
  }
};

export const main = middyfy(get);
