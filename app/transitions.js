export default function(){

  const transitions = [
    'index|about|fade|fade',
    ''
  ];

  // Add your transitions here, like:
  //   this.transition(
  //     this.fromRoute('people.index'),
  //     this.toRoute('people.detail'),
  //     this.use('toLeft'),
  //     this.reverse('toRight')
  //   );

  transitions.forEach((trans) => {
    let parts = trans.split('|');

    if (parts.length > 3) {
      this.transition(
        this.fromRoute(`routes.${parts[0]}`),
        this.toRoute(`routes.${parts[1]}`),
        this.use(`${parts[2]}`),
        this.reverse(`${parts[3]}`)
      );
    } else if (parts.length > 2) {
      this.transition(
        this.fromRoute(`routes.${parts[0]}`),
        this.toRoute(`routes.${parts[1]}`),
        this.use(`${parts[2]}`)
      );
    }
  });
}
