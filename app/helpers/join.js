import { helper } from '@ember/component/helper';

export function join([first, ...params]/*, hash*/) {
  if (first) {
    params.forEach((param) => {
      if (param) first = `${first} ${param}`;
    });
  }

  return first;
}

export default helper(join);
