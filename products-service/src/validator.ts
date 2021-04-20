import { Schema } from 'joi';
import { CustomError } from './customError';
import { CODES } from './constants';

export const validator = async (schema: Schema, data: any) => {
  try {
    await schema.validateAsync(data);
  } catch ({ details }) {
    const message = details?.reduce((acc, current) => {
      acc[current.path[0]] = current.message;
      return acc;
    }, {});
    throw new CustomError({ code: CODES.BAD_DATA, message });
  }
};
