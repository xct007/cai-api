import t from "tap";
import { build } from "../helper.js";

t.test("GET /test should return the correct response", async (t) => {
	const fastify = await build(t);
	await fastify.ready();

	const response = await fastify.inject({
		method: "GET",
		url: "/ping",
	});

	t.equal(response.statusCode, 200);
	t.same(response.json(), {
		status: true,
		message: "pong!",
	});
});
