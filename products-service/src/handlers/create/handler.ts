import 'source-map-support/register';
import { decode } from 'querystring';

import { middyfy } from '@libs/lambda';
import { productsService } from '../../service';
import { sendResponse } from '../../utils';
import { validator } from '../../validator';
import { createProductSchema } from '../../schemas';

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const product = decode(event.body);
  const {
    title,
    description,
    price,
    count,
  } = decode(event.body);

  console.log('new product data:', product);

  try {
    await validator(createProductSchema, product);
    const result = await productsService.add(title as string, description as string, Number(price), Number(count));
    return sendResponse(result);
  } catch (error) {
    return sendResponse(error);
  }
};

export const main = middyfy(handler);
