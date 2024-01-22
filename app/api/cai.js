import { Chat } from "@xct007/chrt-ai";
import config from "./config.js";

const chat = new Chat();
chat.authenticate(config.access_token, config.id_token).then(() => {
	console.log("Authenticated");
});
export default chat;
