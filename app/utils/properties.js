import ENV from 'karir/config/environment';

export const ROUTE_PREFIX = 'routes';
export const MODEL_PREFIX = 'models';

export const TIMEOUT = 10;
export const ENVIRONMENT = ENV.environment;
export const HOST = {
  'development' : '',
  'test'        : '',
  'production'  : ''
};

export default {
  ROUTE_PREFIX,
  MODEL_PREFIX,
  TIMEOUT,
  ENVIRONMENT,
  HOST
};
