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

    if(from)  this.pushObject(this.fromRoute(`${ROUTE_PREFIX}.${from}`));
    if(to)    this.pushObject(this.toRoute(`${ROUTE_PREFIX}.${to}`));
    if(use)   this.pushObject(this.use(use));
    if(rev)   this.pushObject(this.reverse(rev));

    this.transition(...params);
  }
}
