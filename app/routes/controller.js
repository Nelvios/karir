import Controller from '@ember/controller';
import { ROOT_URL } from 'karir/utils/properties';
import { jQ } from 'karir/utils/short';

export default Controller.extend({

  size: null,

  actions: {

    load() {
      const small = 600;
      const medium = 992;
      const large = 1200;

      // run after page load
      jQ(window).resize(() => {
        const width = jQ(window).outerWidth();
        const size = width <= small ? 'sm' : width <= medium ? 'md' : width <= large ? 'lg' : 'xl';

        jQ('body').attr('data-size', size);
      });

      jQ(window).resize();

      this.send('text');
    },

    text() {
      const loc = window.location;
      const port = loc.port ? `:${loc.port}` : '';
      const text = ['',
        '     ____  _____________  ________ ',
        '  __/ / /_/  _/_  __/ _ )/ ___/ _ |',
        ' /_  . __// /  / / / _  / /__/ __ |',
        '/_    __/___/ /_/ /____/\\___/_/ |_|',
        ' /_/_/                             ',
        '',
        '===================================',
        '',
        'Nice job finding this! Looking for some more?',
        `Well, you can join us at ${loc.protocol}//${loc.hostname}${port}${ROOT_URL}jobs`
      ];

      // eslint-disable-next-line no-console
      console.log(text.join('\n'));
    }
  }

});
