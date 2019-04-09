import { HOST, ENVIRONMENT } from 'karir/utils/properties';
import { get } from 'karir/utils/short';

export default function host(key) {

  const host = HOST[ENVIRONMENT];

  const list = {
    'article':{
      search: `${host}/assets/content/articles/data.json`,
      find: `${host}/assets/content/articles/article/:id.json`
    },
    'thought':{
      search: `${host}/assets/content/thoughts/data.json`
    },
    'job':{
      search: `${host}/assets/content/jobs/data.json`,
      find: `${host}/assets/content/jobs/job/:id.json`
    }
  }

  return get(list, key);
}
