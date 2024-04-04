import yaml from "yaml";
import { readFileSync } from "fs";
import SwaggerUI from "swagger-ui-express";
import { join } from "path";

/**
 * Parses the Swagger YAML file.
 * @type {Object}
 */
const docs = yaml.parse(readFileSync(join("app", "swagger.yaml"), "utf8"));
/**
 * Options for Swagger UI customization.
 *
 * @typedef {Object} SwaggerOptions
 * @property {string} customCss - Custom CSS to be applied to the Swagger UI.
 * @property {string} customSiteTitle - Custom title for the Swagger UI site.
 */

/**
 * Swagger options for the CAI API documentation.
 *
 * @type {SwaggerOptions}
 */
const swaggerOptions = {
	customCss: ".swagger-ui .topbar { display: none }",
	customSiteTitle: "CAI API Docs",
};

export default function (app) {
	app.use("/docs", SwaggerUI.serve, SwaggerUI.setup(docs, swaggerOptions));
}
