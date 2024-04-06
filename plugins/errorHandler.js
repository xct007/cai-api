import fp from "fastify-plugin";

/**
 * Error handler plugin
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} opts
 * @param {import("fastify").FastifyPluginCallback} done
 * @returns {void}
 */
function errorHandler(fastify, opts, done) {
	fastify.setErrorHandler((error, request, reply) => {
		const statusCode = error.statusCode || 500;
		const message = error.message || "Internal Server Error";
		const result = error.validation || {};

		reply.status(statusCode).send({
			status: false,
			code: statusCode,
			message,
			result,
		});
	});

	fastify.setNotFoundHandler((request, reply) => {
		const method = request.method;
		const url = request.url;

		reply.status(404).send({
			status: false,
			code: 404,
			message: `Route ${method}:${url} not found`,
			result: {},
		});
	});

	done();
}

export default fp(errorHandler, {
	name: "errorHandler",
});
