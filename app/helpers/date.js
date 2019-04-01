import { helper } from '@ember/component/helper';
import { DATE_FORMAT } from 'karir/utils/properties';
import { moment } from 'karir/utils/short';

export function date(params/*, hash*/) {
  const DEFAULT_FORMAT = 'DD MMM YYYY';

  if(!params[0]) return '-';

  let date = moment(params[0], DATE_FORMAT);
  let format = params[1] || DEFAULT_FORMAT;

  return date.format(format);
}

export default helper(date);
