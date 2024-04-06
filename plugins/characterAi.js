import { Chat } from "@xct007/chrt-ai";

import fp from "fastify-plugin";

/**
 * Error handler plugin
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @returns {Promise<void>}
 */
async function characterAi(fastify, opts) {
	const cai_client = new Chat();
	await cai_client.authenticate(
		fastify.config.ACCESS_TOKEN,
		fastify.config.ID_TOKEN
	);

	fastify.addHook("onClose", async () => {
		await cai_client.close();
	});

	fastify.decorate("cai_client", cai_client);
}

export default fp(characterAi, {
	name: "characterAi",
});
