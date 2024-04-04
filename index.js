import "dotenv/config";
import express from "express";
import server from "./app/server.js";
import initMiddlewares, { notFound, errorHandler } from "./app/middlewares.js";

const app = express();

initMiddlewares(app);

server(app);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
