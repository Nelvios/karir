import { helper } from '@ember/component/helper';

export function sub(params/*, hash*/) {
  if (params.length === 0) return null;

  switch (params.length) {
    case 0: return null;
    case 1: params.pushObject(1); break;
    default: break;
  }

  return params.reduce((num, op) => num*1 - op*1);
}

export default helper(sub);
