import S from "fluent-json-schema";

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @param {import("fastify").FastifyPluginCallback} done
 * @returns {Promise<void>}
 */
export default function status(fastify, opts, done) {
	fastify.route({
		method: "GET",
		path: "/ping",
		handler,
		schema: {
			tags: ["General"],
			summary: "ping the server",
			response: {
				200: S.object()
					.prop("status", S.boolean())
					.prop("message", S.string().default("pong!")),
			},
		},
	});

	/**
	 * @param {import("fastify").FastifyRequest} request
	 * @param {import("fastify").FastifyReply} reply
	 */
	async function handler(request, reply) {
		reply.send({
			status: true,
			message: "pong!",
		});
	}
	done();
}
