const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */

const Product = new keystone.List('Product', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
});

Product.add({
  title: { type: String, required: true },
  price: { type: String },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true,
  },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: {
    type: Types.Date,
    index: true,
    dependsOn: { state: 'published' },
  },
  image: { type: Types.CloudinaryImage },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 },
  },
  categories: { type: Types.Relationship, ref: 'ProductCategory', many: true },
});

Product.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Product.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Product.register();
