import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { importService } from '../../service';

const parseFile = async (event) => {
  console.log('parse', event);
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const record of event.Records) {
      console.log('record', record.s3.object);
      importService.parse(record.s3.object.key);
    }
  } catch (error) {
    console.log(error);
  }
};

export const main = middyfy(parseFile);
