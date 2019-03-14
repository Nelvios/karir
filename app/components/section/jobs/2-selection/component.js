import Component from '@ember/component';

export default Component.extend({
    tagName: 'section',

    didInsertElement(){
        this.$('select').formSelect();
    }
});
