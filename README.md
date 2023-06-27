## Minimal Reproduction - Build Error with JBrowse React Circular Viewer and NextJS 12

NextJS is unable to import and run the [JBrowse React Circular Viewer](https://www.npmjs.com/package/@jbrowse/react-circular-genome-view). During build it results in the following error:

```
> Build error occurred
./node_modules/@jbrowse/react-circular-genome-view/dist/index.js:1
export { default as JBrowseCircularGenomeView } from './JBrowseCircularGenomeView';
^^^^^^

SyntaxError: Unexpected token 'export'
    at Object.compileFunction (node:vm:360:18)

```

This is a known issue that occurs when imported packages have been transpiled to ES2015 or greater as described in [this SO answer](https://stackoverflow.com/a/65939797). It appears that JBrowse is compiling components to ES2018.

This will impact all projects using NextJS <=12 , it was fixed in NextJS 13. 

There is an available remedy to make packages of this sort usable in NextJS <=12, [detailed here](#work-around). There is a separate branch of this repository named `with-work-around` that implements this work around.

### Steps to Reproduce
1. `npm ci`
2. `npm run build`

### Work Around

> There is a separate branch of this repository named `with-work-around` that implements this work around.

The route cause of this issue is that the code for the JBrowse package is transpiled to ES6, and the NextJS build requires all the code to be ES5 to build properly. There are next JS plugins that add a step to the webpack processing to transpile the ES6 packages into ES5 before the NextJS build process gets access to them.

Two dependencies must be added to accomplish this: `npm i -D next-compose-plugins next-transpile-modules`

Modify your `next.config.js` to use plugins, and to transpile the ES6 based modules:

```
const withPlugins = require("next-compose-plugins");

const withTranspileModules = require("next-transpile-modules")([
  "@jbrowse/react-circular-genome-view",
  "@jbrowse/react-linear-genome-view",
	// all other es6 imports
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins([withTranspileModules], nextConfig);
```