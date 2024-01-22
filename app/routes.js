import {
	searchCharacters,
	characterInfo,
	sendMessage,
	statusCai,
} from "./api/controller.js";

export default function (app) {
	app.get("/api/status", statusCai);
	app.get("/api/search_characters", searchCharacters);
	app.get("/api/character_info", characterInfo);
	app.post("/api/send_message", sendMessage);
}
