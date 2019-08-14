import DS from 'ember-data';
import { get } from 'karir/utils/short';
const { attr } = DS;

export default DS.Model.extend({

  name: attr('string'),
  url: attr('string'),
  thumbJob: attr('string'),
  specialization: attr('string'),
  location: attr(),
  description: attr('string'),
  qualification: attr('string'),
  featured: attr('boolean'),

  isSpecialization(spec) {
    return spec === get(this, 'specialization');
  },

  isLocation(loc) {
    const location = get(this, 'location') || []
    return location.includes(loc);
  }

});
