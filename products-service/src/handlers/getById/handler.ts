import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { productsService } from '../../service';
import { sendResponse } from '../../utils';

// todo ADD ValidatedEventAPIGatewayProxyEvent for get response without body
const getById = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { id } = event.pathParameters;
  console.log('requested product id:', id);
  try {
    const result = await productsService.getById(id);
    return sendResponse(result);
  } catch (error) {
    console.log('error', error);
    return sendResponse(error);
  }
};

export const main = middyfy(getById);
