import initRoutes from "./routes.js";
import docs from "./docs.js";

export default function (app) {
	initRoutes(app);
	docs(app);
}
