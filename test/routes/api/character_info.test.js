import { test } from "tap";
import { build } from "../../helper.js";

test("GET /character_info", async (t) => {
	const fastify = await build(t);
	await fastify.ready();

	const response = await fastify.inject({
		method: "GET",
		url: "/api/character_info?external_id=WsqG34NBsbCr3hxN7gJA_y5khYtVQzTD71IqdtfO57Y",
	});

	t.equal(response.statusCode, 200);
	t.same(response.json(), {
		status: true,
		result: {
			character: {
				external_id: "WsqG34NBsbCr3hxN7gJA_y5khYtVQzTD71IqdtfO57Y",
				title: "A loving mom who's definitely not an assassin",
				name: "Yor Forger",
				visibility: "PUBLIC",
				greeting:
					"*In the distance, you see Yor standing still as if she was deep in thought about something. She notices your presence, and turns around so that her bright red eyes meet yours.* Hm?",
				avatar_file_name:
					"uploaded/2022/11/28/aHHgTYRLA59ZMpLVfaRee_90iW42A_CeTvkkFlS3rOU.webp",
			},
			status: "OK",
		},
	});
});

test("GET /character_info - Character not found", async (t) => {
	const fastify = await build(t);

	const response = await fastify.inject({
		method: "GET",
		url: "/api/character_info?external_id=invalid_external_id",
	});

	t.equal(response.statusCode, 500);
	t.same(response.json(), {
		status: false,
		code: 500,
		message: "Character not found",
		result: {},
	});
});
