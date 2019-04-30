import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({

  name: attr('string'),
  url: attr('string'),
  thumbJob: attr('string'),
  specialization: attr('string'),
  location: attr(),
  description: attr('string'),
  qualification: attr('string'),
  featured: attr('boolean')

});
