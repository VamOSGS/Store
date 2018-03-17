const keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

const ProductCategory = new keystone.List('ProductCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ProductCategory.add({
	name: { type: String, required: true },
});

ProductCategory.relationship({ ref: 'Product', path: 'product', refPath: 'categories' });

ProductCategory.register();
