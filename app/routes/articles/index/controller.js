import Controller from '@ember/controller';

export default Controller.extend({

  tagName: 'section',
  queryParams: ['month'],
  month: null,

  viewByMonth: computed('month', {
    get(){
      const month = get(this, 'month');
      let model = get(this, 'model');

      console.log(model);
    }
  }),

  actions: {
    clear(){
      set(this, 'month', null);
    }
  }
});
