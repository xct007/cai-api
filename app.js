import AutoLoad from "@fastify/autoload";
import Env from "@fastify/env";
import Cors from "@fastify/cors";
import UnderPressure from "@fastify/under-pressure";
import Fjs from "fluent-json-schema";
import { join } from "desm";

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @returns {Promise<void>}
 */
export default async function (fastify, opts) {
	await fastify.register(Env, {
		schema: Fjs.object()
			.prop("PORT", Fjs.string().default("3000"))
			.prop("NODE_ENV", Fjs.string().default("development"))
			.prop("ACCESS_TOKEN", Fjs.string().required())
			.prop("ID_TOKEN", Fjs.string().default("")),
	});

	await fastify.register(UnderPressure, {
		maxEventLoopDelay: 1000,
		maxHeapUsedBytes: 1000000000,
		maxRssBytes: 1000000000,
		maxEventLoopUtilization: 0.98,
	});

	await fastify.register(Cors, {
		origin: false,
	});

	await fastify.register(AutoLoad, {
		dir: join(import.meta.url, "plugins"),
		options: Object.assign({}, opts),
	});

	await fastify.register(AutoLoad, {
		dir: join(import.meta.url, "routes"),
		dirNameRoutePrefix: true,
		options: Object.assign({}, opts),
	});
}
