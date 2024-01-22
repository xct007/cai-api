import initMiddlewares, { notFound, errorHandler } from "./middlewares.js";
import initRoutes from "./routes.js";
import docs from "./docs.js";

export default function (app) {
	initMiddlewares(app);
	initRoutes(app);
	docs(app);
	app.use(notFound);
	app.use(errorHandler);
}
