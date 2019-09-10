import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  date: attr('string'),
  thought: attr('string'),
  thumbThought: attr('string'),
  position: attr('string')
});
