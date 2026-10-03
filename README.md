## [xmflsct.com](https://xmflsct.com)

Personal portfolio built with [Astro](https://astro.build/), hosted on [Cloudflare Workers](https://workers.cloudflare.com/).

Run `npm ci` to install dependencies, `npm run dev` to develop locally, and `npm run build` to build the static site.

Deployment uses the beta [Cloudflare CLI (`cf`)](https://developers.cloudflare.com/cf/). Run `npm run deploy:dry-run` to build and validate without uploading, then `npx cf auth login` and `npm run deploy` to publish. The CLI uses its own login, separate from Wrangler.

`cloudflare.config.ts` defines the Worker and custom domains. `wrangler.config.ts` points the build tool at Astro's `dist` directory. `npm run build:cloudflare` builds Astro and packages the assets into Cloudflare Build Output, which `cf deploy --prebuilt` publishes. This explicit packaging step avoids the beta CLI's Astro detection running an Astro build without producing Cloudflare Build Output. Wrangler remains a build dependency. Keep `wrangler.jsonc` as a rollback configuration until the first successful deployment with `cf`; the new build and deployment commands use the TypeScript configuration.

![GitHub repo size](https://img.shields.io/github/repo-size/xmflsct/xmflsct-website)
