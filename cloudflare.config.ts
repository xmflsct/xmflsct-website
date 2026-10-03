import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "xmflsct-website",
		compatibilityDate: "2026-06-27",
		workersDev: false,
		previewUrls: true,
		domains: [
			"xmflsct.com",
			"www.xmflsct.com",
			"zhiyuan.pm",
		],
	},
});
