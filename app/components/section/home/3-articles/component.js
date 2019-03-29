import Component from '@ember/component';

export default Component.extend({

  tagName: 'section',

  articles: [
    {
      title: 'Nvidia is bringing ray tracing to old GPUs that can\'t tray race worth a damn',
      date: '2019-03-19'
    },
    {
      title: 'Should the United States Help Drive Global Development?',
      date: '2018-10-18'
    },
    {
      title: 'The London Olympics as Seen from the Other Side of the World',
      date: '2018-10-05'
    },
    {
      title: 'Unpatriotic History of the Second World War, by James Heartfield',
      date: '2018-10-02'
    }
  ]


});
