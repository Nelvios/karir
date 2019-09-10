import { helper } from '@ember/component/helper';

export function sub(params/*, hash*/) {
  if (params.length === 0) return null;
  const numbers = params.map((num) => num);

  switch (numbers.length) {
    case 0: return null;
    case 1: numbers.pushObject(1); break;
    default: break;
  }

  return numbers.reduce((num, op) => num*1 - op*1);
}

export default helper(sub);
