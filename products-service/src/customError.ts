import { CODES } from './constants';

type Code = Values<typeof CODES>;

export class CustomError extends Error {
  success: boolean;
  message: string;
  code: Code;

  constructor({
    code = CODES.SOMETHING_WENT_WRONG,
    message = 'Something went wrong',
  }: {
    code?: Code,
    message?: string,
  }) {
    super();
    this.success = false;
    this.message = message;
    this.code = code;
  }
}
