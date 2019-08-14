import DS from 'ember-data';
import { get } from 'karir/utils/short';
const { attr } = DS;

export default DS.Model.extend({

  title: attr('string'),
  date: attr('string'),
  article: attr('string'),
  thumbImage: attr('string'),
  tag: attr('string'),

  isTags(...selectedTags) {
    const tags = get(this, 'tag') ? get(this, 'tag').split(',').map(t => t.trim()) : [];
    let isValid = false;
    // let isValid = true;

    selectedTags.forEach(tag => {
      isValid = isValid || tags.includes(tag);
      // isValid = isValid && tags.includes(tag);
    });

    return isValid;
  }

});
