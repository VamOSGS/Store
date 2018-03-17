const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

const routes = {
	views: importRoutes('./views'),
};

exports = module.exports = function(app) {
	app.get('/', routes.views.products);
	app.get('/products/:category?', routes.views.products);
	app.get('/item/:product', routes.views.product);
	app.all('/buy/:product', routes.views.buy);
	app.get('/admin', (req, res) => res.redirect('/keystone'));
};
