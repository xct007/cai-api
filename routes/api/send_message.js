import S from "fluent-json-schema";

/**
 * @typedef {import("@xct007/chrt-ai").Chat} Chat
 */

/**
 * @param {import("fastify").FastifyInstance & { cai_client: Chat }} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @returns {Promise<void>}
 */
export default async function send_message(fastify, opts) {
	fastify.route({
		method: "POST",
		path: "/send_message",
		handler,
		schema: {
			tags: ["send_message"],
			summary: "Send a message to a character",
			body: S.object()
				.prop(
					"external_id",
					S.string().default("WsqG34NBsbCr3hxN7gJA_y5khYtVQzTD71IqdtfO57Y")
				)
				.prop("message", S.string().default("Hello")),
			response: {
				200: S.object()
					.prop("status", S.boolean())
					.prop(
						"result",
						S.object()
							.prop(
								"replies",
								S.array().items(S.object().prop("text", S.string()))
							)
							.prop(
								"src_char",
								S.object().prop(
									"participant",
									S.object().prop("name", S.string())
								)
							)
							.prop("is_final_chunk", S.boolean())
							.prop("last_user_msg_id", S.number())
							.prop("last_user_msg_uuid", S.string())
					),
			},
		},
	});

	/**
	 * @param {import("fastify").FastifyRequest}
	 * @param {import("fastify").FastifyReply}
	 */
	async function handler(request, reply) {
		const { external_id, message } = request.body;

		const response = await fastify.cai_client.sendMessage(message, {
			character_external_id: external_id,
		});
		return response.json();
	}
}
