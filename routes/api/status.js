import S from "fluent-json-schema";
import { readFileSync } from "fs";
import { join } from "desm";

const { version } = JSON.parse(
	readFileSync(join(import.meta.url, "../../package.json"))
);

/**
 * @typedef {import("@xct007/chrt-ai").Chat} Chat
 */

/**
 * @param {import("fastify").FastifyInstance & { cai_client: Chat }} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @returns {Promise<void>}
 */
export default async function cai_status(fastify, opts) {
	fastify.route({
		method: "GET",
		path: "/status",
		handler,
		schema: {
			tags: ["General"],
			summary: "Get information about the cai client",
			response: {
				200: S.object()
					.prop("status", S.boolean())
					.prop("message", S.string())
					.prop(
						"result",
						S.object()
							.prop("status", S.string())
							.prop("version", S.string())
							.prop(
								"cai_status",
								S.object()
									.prop("is_authenticated", S.boolean())
									.prop("browser_launched", S.boolean())
							)
					),
			},
		},
	});

	/**
	 * @param {import("fastify").FastifyRequest}
	 * @param {import("fastify").FastifyReply}
	 */
	async function handler(request, reply) {
		return {
			status: true,
			message: "ok",
			result: {
				status: "ok",
				version,
				cai_status: {
					is_authenticated: fastify.cai_client.isAuthenticated,
					browser_launched: fastify.cai_client.hasLaunched,
				},
			},
		};
	}
}
