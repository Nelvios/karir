import { helper } from '@ember/component/helper';
import { ROOT_URL } from 'karir/utils/properties';

export function rootUrl() {
  return ROOT_URL;
}

export default helper(rootUrl);
