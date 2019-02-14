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

import {
  assign as merge
} from '@ember/polyfills';
export { merge };
export function clone(obj) {
  return merge({}, obj);
}

// Utilities
export {
  isEmpty
} from '@ember/utils';
export {
  isArray
} from '@ember/array';
export {
  htmlSafe as html
} from '@ember/template';
export {
  singularize,
  pluralize
} from 'ember-inflector';

// Injection
export {
  inject as controller
} from '@ember/controller';
export {
  inject as service
} from '@ember/service';

// Moment
export const { moment } = window;

// XLSX
const { XLSX } = window;
export { XLSX as xlsx };

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
//   debug as log
// } from '@ember/debug';

export function log() {
  console.log(...arguments);
}

// export default function short() {
//   return true;
// }
