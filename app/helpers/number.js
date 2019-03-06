import { helper } from '@ember/component/helper';
import { DELIMITER } from 'karir/utils/properties';
import { isEmpty } from 'karir/utils/short';

export function number(params/*, hash*/) {
  const DECIMAL = DELIMITER === ',' ? '.' : ',';

  let num = isEmpty(params[0]) ? 0 : Number(params[0]);
  let precision = Number(params[1]) || 0;

  if (!isNaN(num)) {
    num = num.toFixed(precision).toString().split('.');

    num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, DELIMITER);
    num = num.join(DECIMAL);
  }

  return num.toString();
}

export default helper(number);
