import { helper } from '@ember/component/helper';
import { isEmpty } from 'karir/utils/short';

export function ifEmpty(params/*, hash*/) {

  if(params.length === 0) return null;

  const empty = params[1] || '-';

  return isEmpty(params[0]) ? empty : params[0];
}

export default helper(ifEmpty);
