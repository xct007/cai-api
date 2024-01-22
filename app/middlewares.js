import cors from "cors";
// import { rateLimit } from "express-rate-limit";
import { json, urlencoded } from "express";

export function notFound(req, res, next) {
	res.status(404);
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
	next(error);
}

export function errorHandler(error, req, res, next) {
	res.status(res.statusCode || 500);
	res.json({
		status: false,
		code: res.statusCode,
		message: error.message,
	});
}

export default function initMiddlewares(app) {
	app.set("x-powered-by", false);
	app.set("trust proxy", 1);
	app.use(cors());
	// app.use(rateLimit({ max: 10 }));
	app.use(json());
	app.use(urlencoded({ extended: true }));
}
