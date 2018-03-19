require('dotenv').config();
const keystone = require('keystone');
const handlebars = require('express-handlebars');

keystone.init({
	name: 'ShopApp',
	brand: 'ShopApp',
	less: 'public',
	static: 'public',
	favicon: 'public/favicon.ico',
	views: 'templates/views',
	'view engine': '.hbs',
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,
	'auto update': true,
	session: true,
	auth: true,
	'user model': 'User',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));

keystone.set('nav', {
	products: ['products', 'product-categories'],
	orders: 'orders',
	users: 'users',
});

keystone.start();
