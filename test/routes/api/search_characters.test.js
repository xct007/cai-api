import { test } from "tap";
import { build } from "../../helper.js";

test("search_characters route", async (t) => {
	const fastify = await build(t);
	await fastify.ready();

	const response = await fastify.inject({
		method: "GET",
		url: "/api/search_characters?query=momy",
	});

	t.equal(response.statusCode, 200, "status code should be 200");
	t.equal(
		response.headers["content-type"],
		"application/json; charset=utf-8",
		"content type should be JSON"
	);

	const body = JSON.parse(response.body);
	t.type(body, "object", "response body should be an object");
	t.type(body.status, "boolean", "status should be a boolean");
	t.type(body.result, "object", "result should be an object");
	t.type(body.result.characters, "object", "characters should be an array");

	t.end();
});
