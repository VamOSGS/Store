let keystone = require('keystone');
let async = require('async');

exports = module.exports = function(req, res) {
	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'products';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: [],
	};

	view.on('init', function(next) {
		keystone
			.list('ProductCategory')
			.model.find()
			.sort('name')
			.exec(function(err, results) {
				if (err || !results.length) {
					return next(err);
				}

				locals.data.categories = results;

				async.each(
					locals.data.categories,
					function(category, next) {
						keystone
							.list('Product')
							.model.count()
							.where('categories')
							.in([category.id])
							.exec(function(err, count) {
								category.postCount = count;
								next(err);
							});
					},
					err => {
						next(err);
					},
				);
			});
	});

	view.on('init', function(next) {
		if (req.params.category) {
			keystone
				.list('ProductCategory')
				.model.findOne({ key: locals.filters.category })
				.exec(function(err, result) {
					locals.data.category = result;
					next(err);
				});
		} else {
			next();
		}
	});

	view.on('init', function(next) {
		let q = keystone
			.list('Product')
			.paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10,
				filters: {
					state: 'published',
				},
			})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	view.render('products');
};
