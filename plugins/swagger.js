import { readFileSync } from "fs";
import { join } from "desm";
import fp from "fastify-plugin";
import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";

const { version } = JSON.parse(
	readFileSync(join(import.meta.url, "../package.json"))
);

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @returns {Promise<void>}
 */
async function swaggerGenerator(fastify, opts) {
	await fastify.register(Swagger, {
		openapi: {
			info: {
				title: "CAI API Documentation",
				description: "CAI API Documentation",
				version,
			},
			servers: [
				{
					url: "https://apigratis.site",
					description: "Production server",
				},
			],
		},
		exposeRoute: fastify.config.NODE_ENV !== "production",
		stripBasePath: false,
	});

	if (fastify.config.NODE_ENV !== "production") {
		await fastify.register(SwaggerUI, {
			routePrefix: "/docs",
			uiConfig: {
				docExpansion: "list",
				deepLinking: false,
				tagsSorter: "alpha",
				syntaxHighlight: {
					activated: true,
					theme: "agate",
				},
			},
			theme: {
				title: "CAI API Documentation",
				css: [
					{
						filename: "custom.css",
						content: ".topbar { display: none }",
					},
				],
			},
		});
	}
}

export default fp(swaggerGenerator, {
	name: "swaggerGenerator",
});
