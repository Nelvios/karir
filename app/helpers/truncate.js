import { helper } from '@ember/component/helper';

export function truncate(params/*, hash*/) {
  const limit = isNaN(params[1]) ? 30 : params[1];

  if(params[0]) {
    let str = params[0];

    if(str.length > limit) str = `${str.substr(0, limit - 3)}...`;
    return str;
  }

  return null;
}

export default helper(truncate);
