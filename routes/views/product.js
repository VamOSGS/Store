const keystone = require('keystone');

exports = module.exports = function(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'product';
	locals.filters = {
		product: req.params.product,
	};
	locals.data = {
		posts: [],
	};

	view.on('init', function(next) {
		const q = keystone
			.list('Product')
			.model.findOne({
				state: 'published',
				slug: locals.filters.product,
			})
			.populate('author categories');

		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});
	});

	view.on('init', function(next) {
		const q = keystone
			.list('Product')
			.model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author')
			.limit('4');

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	view.render('product');
};
