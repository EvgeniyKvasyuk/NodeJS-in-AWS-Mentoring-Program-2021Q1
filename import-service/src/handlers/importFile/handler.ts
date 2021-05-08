import { middyfy } from '@libs/lambda';
import { sendResponse } from '../../utils';
import { importService } from '../../service';

const importFile = async (event) => {
  console.log('import', event);
  try {
    const result = await importService.import(event.queryStringParameters.name);
    return sendResponse(result);
  } catch (error) {
    console.log(error);
    return sendResponse(error);
  }
};

export const main = middyfy(importFile);
