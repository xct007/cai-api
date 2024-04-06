import S from "fluent-json-schema";

/**
 * @typedef {import("@xct007/chrt-ai").Chat} Chat
 */

/**
 * @param {import("fastify").FastifyInstance & { cai_client: Chat }} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @returns {Promise<void>}
 */
export default async function search_characters(fastify, opts) {
	fastify.route({
		method: "GET",
		path: "/search_characters",
		handler,
		schema: {
			tags: ["characters"],
			summary: "Search characters",
			query: S.object().prop("query", S.string().default("momy").required()),
			response: {
				200: S.object()
					.prop("status", S.boolean())
					.prop(
						"result",
						S.object()
							.prop(
								"characters",
								S.array().items(
									S.object()
										.prop("document_id", S.string())
										.prop("external_id", S.string())
										.prop("title", S.string())
										.prop("greeting", S.string())
										.prop("avatar_file_name", S.string())
										.prop("visibility", S.string())
										.prop("participant__name", S.string())
										.prop("participant__num_interactions", S.number())
										.prop("user__username", S.string())
										.prop("priority", S.number())
										.prop("search_score", S.number())
								)
							)
							.prop("request_id", S.string())
					),
			},
		},
	});

	/**
	 * @param {import("fastify").FastifyRequest} request
	 * @param {import("fastify").FastifyReply} reply
	 */
	async function handler(request, reply) {
		const { query } = request.query;

		const response = await fastify.cai_client.searchCharacters(query);
		return response.json();
	}
}
