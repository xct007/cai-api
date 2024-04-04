import cors from "cors";
import morgan from "morgan";
// import { rateLimit } from "express-rate-limit";
import { json, urlencoded } from "express";

/**
 * Not found middleware.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @param {import("express").NextFunction} next - The next function.
 * @returns {void}
 */
export function notFound(req, res, next) {
	res.status(404);
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
	next(error);
}

/**
 * Error handler middleware.
 *
 * @param {Error} error - The error object.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @param {import("express").NextFunction} next - The next function.
 * @returns {void}
 */
export function errorHandler(error, req, res, next) {
	res.status(res.statusCode || 500);
	res.json({
		status: false,
		code: res.statusCode,
		message: error.message,
	});
}

/**
 * Initializes the middlewares for the Express app.
 * @param {import("express").Express} app - The Express app.
 */
export default function initMiddlewares(app) {
	app.set("x-powered-by", false);
	app.set("trust proxy", 1);
	app.use(morgan("dev"));
	app.use(cors());
	// app.use(rateLimit({ max: 10 }));
	app.use(json());
	app.use(urlencoded({ extended: true }));
}
