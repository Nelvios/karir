'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  let script = {
    bootstrap:  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    moment:     'node_modules/moment/min/moment.min.js',
    // chart:      'node_modules/chart.js/dist/Chart.min.js',
    // chartLabel: 'node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.min.js',
  };

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  for(let path in script) {
    app.import(script[path]);
  }

  return app.toTree();
};
