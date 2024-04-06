import { test } from "tap";
import { build } from "../../helper.js";

test("send_message route", async (t) => {
	const fastify = await build(t);
	await fastify.ready();
	// Test case 1: Sending a message with default values
	const response1 = await fastify.inject({
		method: "POST",
		url: "/api/send_message",
		payload: {},
	});
	t.equal(response1.statusCode, 200);

	const body = JSON.parse(response1.body);
	t.type(body, "object", "response body should be an object");
	t.type(body.status, "boolean", "status should be a boolean");
	t.type(body.result, "object", "result should be an object");
	t.type(body.result.replies, "object", "replies should be an array");
	t.type(body.result.src_char, "object", "src_char should be an object");
	t.type(
		body.result.src_char.participant,
		"object",
		"src_char.participant should be an object"
	);
	t.type(
		body.result.src_char.participant.name,
		"string",
		"src_char.participant.name should be a string"
	);
	t.type(
		body.result.is_final_chunk,
		"boolean",
		"is_final_chunk should be a boolean"
	);
	t.type(
		body.result.last_user_msg_id,
		"number",
		"last_user_msg_id should be a number"
	);
	t.type(
		body.result.last_user_msg_uuid,
		"string",
		"last_user_msg_uuid should be a string"
	);

	await fastify.close();
});
