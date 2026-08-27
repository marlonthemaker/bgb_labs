import path from "node:path";
import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = `
	default-src 'self';
	script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""};
	style-src 'self' 'unsafe-inline';
	img-src 'self' blob: data:;
	font-src 'self';
	connect-src 'self'${isDevelopment ? " ws: wss:" : ""};
	object-src 'none';
	base-uri 'self';
	form-action 'self';
	frame-ancestors 'none';
`
	.replace(/\s{2,}/g, " ")
	.trim();

const nextConfig: NextConfig = {
	output: "standalone",
	outputFileTracingRoot: path.join(import.meta.dirname, ".."),
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "Content-Security-Policy", value: contentSecurityPolicy },
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
					},
					{ key: "Referrer-Policy", value: "no-referrer" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
					...(isDevelopment
						? []
						: [
								{
									key: "Strict-Transport-Security",
									value: "max-age=31536000; includeSubDomains",
								},
							]),
				],
			},
		];
	},
};

export default nextConfig;
