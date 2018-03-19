const keystone = require('keystone');
const Types = keystone.Field.Types;

const Order = new keystone.List('Order', {
	nocreate: true,
	noedit: true,
});

Order.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	product: { type: String, require: true },
	phone: { type: String },
	message: { type: Types.Markdown },
	createdAt: { type: Date, default: Date.now },
});

Order.defaultSort = '-createdAt';
Order.defaultColumns = 'name, email, OrderType, createdAt';
Order.register();
