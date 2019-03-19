import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('routes', { path: '/' }, function() {
    this.route('jobs');
    this.route('coba', {path: '/:article_id'});
  });
});

export default Router;
