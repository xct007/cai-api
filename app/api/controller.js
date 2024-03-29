import chat from "./cai.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {Promise<void>}
 * @route GET /api/search_characters
 */
export async function searchCharacters(req, res, next) {
	const { query } = req.query;
	if (!query) {
		const error = new Error("Missing query");
		error.status = 400;
		return next(error);
	}
	const response = await chat.searchCharacters(query);
	const json = await response.json();
	res.json(json);
}
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {Promise<void>}
 * @route GET /api/character_info
 */
export async function characterInfo(req, res, next) {
	const { external_id } = req.query;
	if (!external_id) {
		const error = new Error("Missing external_id");
		error.status = 400;
		return next(error);
	}
	const response = await chat.characterInfo(external_id);
	const json = await response.json();
	res.json(json);
}
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {Promise<void>}
 * @route POST /api/send_message
 */
export async function sendMessage(req, res, next) {
	const { external_id, message } = req.query;
	if (!external_id || !message) {
		const error = new Error(`Missing ${!external_id ? "external_id" : "text"}`);
		error.status = 400;
		return next(error);
	}
	const response = await chat.sendMessage(message, {
		character_external_id: external_id,
	});
	const json = await response.json();
	res.json(json);
}

export function statusCai(req, res, next) {
	res.json({
		status: true,
		result: {
			status: "ok",
			version: "1.0.0",
			cai_status: {
				is_authenticated: chat.isAuthenticated,
				browser_launched: chat.hasLaunched,
			},
		},
	});
}
