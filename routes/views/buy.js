const keystone = require('keystone');
const Order = keystone.list('Order');
require('dotenv').config();
const { URL } = process.env;
exports = module.exports = function(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;
	locals.section = 'buy';
	locals.data = {
		product: {},
		err: false,
		URL,
	};
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.OrderSubmitted = false;
	view.on('init', next => {
		const q = keystone
			.list('Product')
			.model.findOne({
				state: 'published',
				slug: req.params.product,
			})
			.populate('author categories');

		q.exec((err, result) => {
			if (result !== null) {
				locals.data.product = {
					id: result._id,
					price: result.price,
					title: result.title,
					slug: result.slug,
					image: result.image.url,
				};
			} else {
				locals.data.err = true;
			}
			next(err);
		});
	});
	view.on('post', { action: 'contact' }, next => {
		const newOrder = new Order.model();
		const updater = newOrder.getUpdateHandler(req);
		// console.log(req.body);
		updater.process(
			req.body,
			{
				flashErrors: true,
				fields: 'name, email, phone, product, message',
				errorMessage: 'There was a problem submitting your Order:',
			},
			err => {
				if (err) {
					console.log('err');
					locals.validationErrors = err.errors;
				} else {
					locals.OrderSubmitted = true;
				}
				next();
			},
		);
	});

	view.render('buy');
};
