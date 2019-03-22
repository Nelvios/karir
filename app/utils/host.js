import { HOST, ENVIRONMENT } from 'karir/utils/properties';
import { get } from 'karir/utils/short';

export default function host(key) {

  const host = HOST[ENVIRONMENT];

  const list = {
    'article':{
      search: `${host}/api/article/list`
    },
    'thought':{
      search: `${host}/api/thought/list`
    },
    'job':{
      search: `${host}/api/job/list`,
      find: `${host}/api/data/get/:id`
    }
  }

  return get(list, key);
}
