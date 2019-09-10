import { helper } from '@ember/component/helper';
import { html as htmlSafe } from 'karir/utils/short';

export function html(params/*, hash*/) {
  return params[0] ? htmlSafe(params[0]) : '';
}

export default helper(html);
