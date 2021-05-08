import { S3 } from 'aws-sdk';
import csv from 'csv-parser';
import { CODES, DEFAULT_SUCCESS_RESULT } from './constants';
import { CustomError } from './customError';
import { ResultType } from './types';

export class ImportService {
  s3: S3;
  BUCKET_NAME = 'nodejs-in-aws-2021q1-files';

  constructor() {
    this.s3 = new S3({ region: 'eu-west-1' });
  }

  async import(name): Promise<ResultType<any> | InstanceType<typeof CustomError>> {
    try {
      const params = {
        Bucket: this.BUCKET_NAME,
        Key: `uploaded/${name}`,
        Expires: 60,
        ContentType: 'text/csv',
      };

      const result = await this.s3.getSignedUrlPromise('putObject', params);

      return { ...DEFAULT_SUCCESS_RESULT, data: result };
    } catch ({ code, message }) {
      throw new CustomError({ code, message });
    }
  }

  csvParse(path: string) {
    console.log('CSV parsing is started');
    const result = [];
    return new Promise<void>((res, rej) => {
      this.s3
        .getObject({
          Bucket: this.BUCKET_NAME,
          Key: path,
        })
        .createReadStream()
        .pipe(csv())
        .on('data', (data) => result.push(data))
        .on('end', () => {
          console.log('CSV parsing is finished');
          console.log(result);
          res();
        })
        .on('error', (error) => {
          console.log('CSV parsing is failed');
          rej(error);
        });
    });
  }

  async parse(path: string) {
    try {
      await this.csvParse(path);
      await this.moveToParsed(path);
    } catch ({ code, message }) {
      throw new CustomError({
        message,
        code: code ?? CODES.SOMETHING_WENT_WRONG,
      });
    }
  }

  async moveToParsed(path: string) {
    console.log(`Start moving ${path}`);
    await this.s3
      .copyObject({
        Bucket: this.BUCKET_NAME,
        CopySource: `${this.BUCKET_NAME}/${path}`,
        Key: path.replace('uploaded', 'parsed'),
      })
      .promise();
    console.log(`${path} is copied to ${path.replace('uploaded', 'parsed')}`);

    await this.s3
      .deleteObject({
        Bucket: this.BUCKET_NAME,
        Key: path,
      })
      .promise();
    console.log(`${path} is deleted`);
  }
}

export const importService = new ImportService();
