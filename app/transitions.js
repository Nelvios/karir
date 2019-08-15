import { ROUTE_PREFIX } from 'karir/utils/properties';

export default function(){
  // Add your transitions here, like:
  //   this.transition(
  //     this.fromRoute('people.index'),
  //     this.toRoute('people.detail'),
  //     this.use('toLeft'),
  //     this.reverse('toRight')
  //   );

  const simple = (from, to, use, rev) => {
    const params = [];

    if(from)  params.pushObject(this.fromRoute(`${ROUTE_PREFIX}.${from}`));
    if(to)    params.pushObject(this.toRoute(`${ROUTE_PREFIX}.${to}`));
    if(use)   params.pushObject(this.use(use));
    if(rev)   params.pushObject(this.reverse(rev));

    this.transition(...params);
  };

  simple('index', 'about', 'crossFade', 'crossFade');
  simple('index', 'jobs', 'crossFade', 'crossFade');
  simple('index', 'articles', 'crossFade', 'crossFade');
  simple('about', 'jobs', 'crossFade', 'crossFade');
  simple('about', 'articles', 'crossFade', 'crossFade');
  simple('jobs', 'articles', 'crossFade', 'crossFade');
  simple('articles.index', 'articles.view', 'crossFade', 'crossFade');

}
