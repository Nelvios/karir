// Application
export {
  getOwner
} from '@ember/application';

// Objects
export {
  get, set,
  getProperties as gets,
  setProperties as sets,
  computed
} from '@ember/object';
export {
  alias
} from '@ember/object/computed';
export function merge (obj, ...objs) {
  Object.assign(obj, ...objs);
  return obj;
}

// Utilities
export {
  isEmpty
} from '@ember/utils';
export {
  htmlSafe as html
} from '@ember/string';

// Injection
export {
  inject as controller
} from '@ember/controller';
export {
  inject as service
} from '@ember/service';

// Moment
export const { moment } = window;

// Scheduler
import {
  join, later, cancel,
  debounce, throttle
} from '@ember/runloop';
export const run = {
  join, later, cancel,
  debounce, throttle
};

// JQuery
export { default as jQ } from 'jquery';

// Logger
// export {
//   default as log
// } from 'mak/utils/logger';

// export default function short() {
//   return true;
// }
