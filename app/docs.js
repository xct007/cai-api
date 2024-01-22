import yaml from "yaml";
import { readFileSync } from "fs";
import SwaggerUI from "swagger-ui-express";
import { join } from "path";

const docs = yaml.parse(readFileSync(join("app", "swagger.yaml"), "utf8"));
const swaggerOptions = {
	customCss: ".swagger-ui .topbar { display: none }",
	customSiteTitle: "CAI API Docs",
};

export default function (app) {
	app.use("/docs", SwaggerUI.serve, SwaggerUI.setup(docs, swaggerOptions));
}
