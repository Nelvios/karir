import { helper } from '@ember/component/helper';

export function run(params/*, hash*/) {
  for(let script of params) {
    script();
  }

  return null;
}

export default helper(run);
