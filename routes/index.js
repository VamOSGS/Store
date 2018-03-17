const keystone = require("keystone");
const middleware = require("./middleware");
const importRoutes = keystone.importer(__dirname);

keystone.pre("routes", middleware.initLocals);
keystone.pre("render", middleware.flashMessages);

const routes = {
	views: importRoutes("./views")
};

exports = module.exports = function(app) {
	app.get("/", routes.views.index);
	app.get("/blog/:category?", routes.views.blog);
	app.get("/blog/post/:post", routes.views.post);
	app.all("/contact", routes.views.contact);
	app.get("/admin", (req, res) => res.redirect("/keystone"));
};
