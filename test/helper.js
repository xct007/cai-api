import Fastify from "fastify";
import fp from "fastify-plugin";
import { join } from "desm";
import { readFileSync } from "fs";
import App from "../app.js";

export function readEnvFile(file = ".env") {
	const str = readFileSync(file, "utf8");
	for (const line of str.split("\n")) {
		const [key, value] = line.split("=");
		process.env[key] = value.replace(/"/g, "");
	}
}

export async function build(t, opts = {}) {
	readEnvFile(join(import.meta.url, "../.env"));
	const app = Fastify();

	await app.register(fp(App), opts);

	t.teardown(() => app.close());

	return app;
}
