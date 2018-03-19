require('dotenv').config();
const { LAST_NAME, FIRST_NAME, EMAIL, PASSWORD } = process.env;

exports.create = {
	User: [
		{
			'name.first': FIRST_NAME,
			'name.last': LAST_NAME,
			email: EMAIL,
			password: PASSWORD,
			isAdmin: true,
		},
	],
};
