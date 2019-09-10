import ENV from 'karir/config/environment';

export const ROUTE_PREFIX = 'routes';
export const MODEL_PREFIX = 'models';

export const ENVIRONMENT = ENV.environment;
export const ROOT_URL = ENV.rootURL;
export const HOST = {
  'development' : `${ROOT_URL}`,
  'test'        : `${ROOT_URL}`,
  'production'  : `${ROOT_URL}`
};

export const REQUEST_TIMEOUT = 15;      // in seconds

export const DELIMITER = '.';
export const DATE_FORMAT = 'YYYY-MM-DD';

export default {
  ROUTE_PREFIX,
  MODEL_PREFIX,
  ENVIRONMENT,
  HOST,
  REQUEST_TIMEOUT,
  DELIMITER,
  DATE_FORMAT
};
