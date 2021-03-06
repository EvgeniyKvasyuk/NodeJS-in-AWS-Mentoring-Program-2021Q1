export const BUSINESS_EXCEPTION_CODES = {
  NOT_FOUND: 'NOT_FOUND',
  BAD_DATA: 'BAD_DATA',
} as const;

export const SYSTEM_EXCEPTION_CODES = {
  SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',
} as const;

export const AUTH_CODES = {
  INCORRECT_TOKEN: 'INCORRECT_TOKEN',
  UNAUTHORIZED_ERROR: 'UNAUTHORIZED_ERROR',
} as const;

export const SUCCESS_CODES = {
  SUCCESS: 'SUCCESS',
} as const;

export const CODES = {
  ...BUSINESS_EXCEPTION_CODES,
  ...SYSTEM_EXCEPTION_CODES,
  ...SUCCESS_CODES,
  ...AUTH_CODES,
} as const;

export const codesToStatusCodesMap = {
  [CODES.SUCCESS]: 200,
  [CODES.BAD_DATA]: 400,
  [CODES.NOT_FOUND]: 404,
  [CODES.SOMETHING_WENT_WRONG]: 500,
  [CODES.UNAUTHORIZED_ERROR]: 401,
  [CODES.INCORRECT_TOKEN]: 403,
} as const;

export const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
} as const;

export const DEFAULT_ERROR_STATUS = codesToStatusCodesMap[CODES.SOMETHING_WENT_WRONG];
export const DEFAULT_SUCCESS_STATUS = codesToStatusCodesMap[CODES.SUCCESS];
export const DEFAULT_SUCCESS_RESULT = { success: true, code: CODES.SUCCESS };

