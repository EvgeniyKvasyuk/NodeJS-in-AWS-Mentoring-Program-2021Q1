import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { productsService } from '../../service';
import { sendResponse } from '../../utils';
import { CustomError } from '../../customError';

// todo ADD ValidatedEventAPIGatewayProxyEvent for get response without body
const products = async (event) => {
  const { id } = event.pathParameters;
  try {
    const result = await productsService.getById(id);
    return sendResponse(result);
  } catch (error) {
    return sendResponse(new CustomError({ code: error.code, message: error.message }));
  }
};

export const main = middyfy(products);
