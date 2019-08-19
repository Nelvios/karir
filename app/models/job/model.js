import DS from 'ember-data';
import { get, computed, isEmpty } from 'karir/utils/short';
const { attr } = DS;

export default DS.Model.extend({

  name: attr('string'),
  url: attr('string'),
  thumbJob: attr('string'),
  specialization: attr('string'),
  location: attr('string'),
  description: attr('string'),
  qualification: attr('string'),
  featured: attr('boolean'),

  jobImage: computed('thumbJob', 'specialization', {
    get() {
      const spec = get(this, 'specialization');
      const img = get(this, 'thumbJob');
      const url = {
        programmer:     '/assets/images/jobs/jobtype-1.png',
        infrastructure: '/assets/images/jobs/jobtype-4.png',
        data:           '/assets/images/jobs/jobtype-3.png',
        others:         '/assets/images/jobs/jobtype-2.png'
      }

      return img ? img : url[spec];
    }
  }),

  isSpecialization(spec) {
    return spec === get(this, 'specialization');
  },

  isLocation(loc) {
    let location = isEmpty(get(this, 'location')) ? null : get(this, 'location');

    location = location.split(',').map(item => item.trim().toLowerCase());
    return location.includes(loc.toLowerCase());
  }

});
