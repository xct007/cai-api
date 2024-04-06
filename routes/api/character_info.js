import S from "fluent-json-schema";

/**
 * @typedef {import("@xct007/chrt-ai").Chat} Chat
 */

/**
 * @param {import("fastify").FastifyInstance & { cai_client: Chat }} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @returns {Promise<void>}
 */
export default async function character_info(fastify, opts) {
	fastify.route({
		method: "GET",
		path: "/character_info",
		handler,
		schema: {
			tags: ["characters"],
			summary: "characters info",
			query: S.object().prop(
				"external_id",
				S.string()
					.default("WsqG34NBsbCr3hxN7gJA_y5khYtVQzTD71IqdtfO57Y")
					.required()
			),
			response: {
				200: S.object()
					.prop("status", S.boolean())
					.prop(
						"result",
						S.object()
							.prop(
								"character",
								S.object()
									.prop("external_id", S.string())
									.prop("title", S.string())
									.prop("name", S.string())
									.prop("visibility", S.string())
									.prop("greeting", S.string())
									.prop("avatar_file_name", S.string())
							)
							.prop("status", S.string())
					),
			},
		},
	});

	/**
	 * @param {import("fastify").FastifyRequest}
	 * @param {import("fastify").FastifyReply}
	 */
	async function handler(request, reply) {
		const { external_id } = request.query;

		const response = await fastify.cai_client.characterInfo(external_id);
		const json = response.json();
		if (json?.result?.error) {
			throw new Error("Character not found");
		}
		return json;
	}
}
