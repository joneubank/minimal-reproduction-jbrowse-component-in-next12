## Minimal Reproduction - Build Error with JBrowse React Circular Viewer and NextJS 12

> This branch is a demonstration of the work around to circumvent the issue. The `main` branch details the original error.

This will be necessary to use JBrowse React Components with NextJS <=12.  Unfortunately Next13 requires React 18+ and JBrowse React Components have a peer dependency for React 17, so there may be other issues using these components with newer versions of NextJS.
### Steps to run
1. `npm ci`
2. `npm run dev`
   1. Can now visit `http://localhost:3000` to see the demo page running. The Circular Genome View will be there with an error (since it was not configured to show anything in this demo).

### Changes

1. `npm i -D next-compose-plugins next-transpile-modules`
2. Added plugins to `next.config.js`:

	 ```
	 const withPlugins = require("next-compose-plugins");
	 
	 const withTranspileModules = require("next-transpile-modules")([
	   "@jbrowse/react-circular-genome-view",
	 ]);
	 
	 /** @type {import('next').NextConfig} */
	 const nextConfig = {
	   reactStrictMode: true,
	 };
	 
	 module.exports = withPlugins([withTranspileModules], nextConfig);
	 
	 ```
