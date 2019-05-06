import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('routes', { path: '/' }, function() {
    this.route('jobs', function() {
      this.route('view', { path: '/:id' });
    });
    this.route('about');
    this.route('articles', function() {
      this.route('view', { path: '/:id' });
    });
  });
});

export default Router;
