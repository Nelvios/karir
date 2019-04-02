import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('routes', { path: '/' }, function() {
    this.route('jobs', function() {
      this.route('view-job', { path: '/:id' });
    });
    this.route('view-article', { path: '/:id' });
  });
});

export default Router;
