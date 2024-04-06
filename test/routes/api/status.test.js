import { test } from "tap";
import { build } from "../../helper.js";

test("GET /status should return the correct response", async (t) => {
	const fastify = await build(t);
	await fastify.ready();

	const response = await fastify.inject({
		method: "GET",
		url: "/api/status",
	});

	t.equal(response.statusCode, 200);

	const body = JSON.parse(response.body);

	t.same(body, {
		status: true,
		message: "ok",
		result: {
			status: "ok",
			version: "1.1.0",
			cai_status: {
				is_authenticated: true,
				browser_launched: true,
			},
		},
	});
});
