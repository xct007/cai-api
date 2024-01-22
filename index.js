import "dotenv/config";
import express from "express";
import server from "./app/server.js";

const app = express();

server(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
