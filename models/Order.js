const keystone = require('keystone');
const Types = keystone.Field.Types;

const Order = new keystone.List('Order', {
	nocreate: true,
	noedit: true,
});

Order.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	product: { type: String },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now },
});

Order.defaultSort = '-createdAt';
Order.defaultColumns = 'name, email, OrderType, createdAt';
Order.register();
