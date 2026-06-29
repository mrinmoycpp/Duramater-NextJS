/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/google/route";
exports.ids = ["app/api/auth/google/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/google/route.js":
/*!**************************************!*\
  !*** ./app/api/auth/google/route.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:crypto */ \"node:crypto\");\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction getOrigin(request) {\n    return \"http://localhost:5673\" || 0;\n}\nasync function GET(request) {\n    const clientId = process.env.GOOGLE_CLIENT_ID;\n    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;\n    if (!clientId || !clientSecret) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Google OAuth is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.'\n        }, {\n            status: 500\n        });\n    }\n    const requestUrl = new URL(request.url);\n    const mode = requestUrl.searchParams.get('mode') === 'register' ? 'register' : 'login';\n    const redirect = requestUrl.searchParams.get('redirect') || '/dashboard';\n    const nonce = node_crypto__WEBPACK_IMPORTED_MODULE_1___default().randomBytes(16).toString('hex');\n    const state = Buffer.from(JSON.stringify({\n        mode,\n        redirect,\n        nonce\n    })).toString('base64url');\n    const params = new URLSearchParams({\n        client_id: clientId,\n        redirect_uri: `${getOrigin(request)}/api/auth/google/callback`,\n        response_type: 'code',\n        scope: 'openid email profile',\n        state,\n        prompt: 'select_account'\n    });\n    const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);\n    response.cookies.set('google_oauth_state', nonce, {\n        httpOnly: true,\n        sameSite: 'lax',\n        secure: requestUrl.protocol === 'https:',\n        maxAge: 10 * 60,\n        path: '/'\n    });\n    return response;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvZ29vZ2xlL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMEM7QUFDVjtBQUVoQyxTQUFTRSxVQUFVQyxPQUFPO0lBQ3hCLE9BQU9DLHVCQUErQixJQUFJLENBQTJCO0FBQ3ZFO0FBRU8sZUFBZU0sSUFBSVAsT0FBTztJQUMvQixNQUFNUSxXQUFXUCxRQUFRQyxHQUFHLENBQUNPLGdCQUFnQjtJQUM3QyxNQUFNQyxlQUFlVCxRQUFRQyxHQUFHLENBQUNTLG9CQUFvQjtJQUVyRCxJQUFJLENBQUNILFlBQVksQ0FBQ0UsY0FBYztRQUM5QixPQUFPYixxREFBWUEsQ0FBQ2UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQWlGLEdBQzFGO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtJQUVBLE1BQU1DLGFBQWEsSUFBSVgsSUFBSUosUUFBUUssR0FBRztJQUN0QyxNQUFNVyxPQUFPRCxXQUFXRSxZQUFZLENBQUNDLEdBQUcsQ0FBQyxZQUFZLGFBQWEsYUFBYTtJQUMvRSxNQUFNQyxXQUFXSixXQUFXRSxZQUFZLENBQUNDLEdBQUcsQ0FBQyxlQUFlO0lBQzVELE1BQU1FLFFBQVF0Qiw4REFBa0IsQ0FBQyxJQUFJd0IsUUFBUSxDQUFDO0lBQzlDLE1BQU1DLFFBQVFDLE9BQU9DLElBQUksQ0FBQ0MsS0FBS0MsU0FBUyxDQUFDO1FBQUVYO1FBQU1HO1FBQVVDO0lBQU0sSUFBSUUsUUFBUSxDQUFDO0lBRTlFLE1BQU1NLFNBQVMsSUFBSUMsZ0JBQWdCO1FBQ2pDQyxXQUFXdEI7UUFDWHVCLGNBQWMsR0FBR2hDLFVBQVVDLFNBQVMseUJBQXlCLENBQUM7UUFDOURnQyxlQUFlO1FBQ2ZDLE9BQU87UUFDUFY7UUFDQVcsUUFBUTtJQUNWO0lBRUEsTUFBTUMsV0FBV3RDLHFEQUFZQSxDQUFDc0IsUUFBUSxDQUFDLENBQUMsNkNBQTZDLEVBQUVTLFFBQVE7SUFDL0ZPLFNBQVNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHNCQUFzQmpCLE9BQU87UUFDaERrQixVQUFVO1FBQ1ZDLFVBQVU7UUFDVkMsUUFBUXpCLFdBQVcwQixRQUFRLEtBQUs7UUFDaENDLFFBQVEsS0FBSztRQUNiQyxNQUFNO0lBQ1I7SUFFQSxPQUFPUjtBQUNUIiwic291cmNlcyI6WyJDOlxcY2hyb21lIGRvd25sb2Fkc1xcRHVyYW1hdGVyLU5leHRKUy1tYWluXFxEdXJhbWF0ZXItTmV4dEpTLW1haW5cXGFwcFxcYXBpXFxhdXRoXFxnb29nbGVcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IGNyeXB0byBmcm9tICdub2RlOmNyeXB0bydcblxuZnVuY3Rpb24gZ2V0T3JpZ2luKHJlcXVlc3QpIHtcbiAgcmV0dXJuIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQUF9VUkwgfHwgbmV3IFVSTChyZXF1ZXN0LnVybCkub3JpZ2luXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdCkge1xuICBjb25zdCBjbGllbnRJZCA9IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSURcbiAgY29uc3QgY2xpZW50U2VjcmV0ID0gcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVRcblxuICBpZiAoIWNsaWVudElkIHx8ICFjbGllbnRTZWNyZXQpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnR29vZ2xlIE9BdXRoIGlzIG5vdCBjb25maWd1cmVkLiBBZGQgR09PR0xFX0NMSUVOVF9JRCBhbmQgR09PR0xFX0NMSUVOVF9TRUNSRVQuJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVxdWVzdFVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwpXG4gIGNvbnN0IG1vZGUgPSByZXF1ZXN0VXJsLnNlYXJjaFBhcmFtcy5nZXQoJ21vZGUnKSA9PT0gJ3JlZ2lzdGVyJyA/ICdyZWdpc3RlcicgOiAnbG9naW4nXG4gIGNvbnN0IHJlZGlyZWN0ID0gcmVxdWVzdFVybC5zZWFyY2hQYXJhbXMuZ2V0KCdyZWRpcmVjdCcpIHx8ICcvZGFzaGJvYXJkJ1xuICBjb25zdCBub25jZSA9IGNyeXB0by5yYW5kb21CeXRlcygxNikudG9TdHJpbmcoJ2hleCcpXG4gIGNvbnN0IHN0YXRlID0gQnVmZmVyLmZyb20oSlNPTi5zdHJpbmdpZnkoeyBtb2RlLCByZWRpcmVjdCwgbm9uY2UgfSkpLnRvU3RyaW5nKCdiYXNlNjR1cmwnKVxuXG4gIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgcmVkaXJlY3RfdXJpOiBgJHtnZXRPcmlnaW4ocmVxdWVzdCl9L2FwaS9hdXRoL2dvb2dsZS9jYWxsYmFja2AsXG4gICAgcmVzcG9uc2VfdHlwZTogJ2NvZGUnLFxuICAgIHNjb3BlOiAnb3BlbmlkIGVtYWlsIHByb2ZpbGUnLFxuICAgIHN0YXRlLFxuICAgIHByb21wdDogJ3NlbGVjdF9hY2NvdW50JyxcbiAgfSlcblxuICBjb25zdCByZXNwb25zZSA9IE5leHRSZXNwb25zZS5yZWRpcmVjdChgaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3YyL2F1dGg/JHtwYXJhbXN9YClcbiAgcmVzcG9uc2UuY29va2llcy5zZXQoJ2dvb2dsZV9vYXV0aF9zdGF0ZScsIG5vbmNlLCB7XG4gICAgaHR0cE9ubHk6IHRydWUsXG4gICAgc2FtZVNpdGU6ICdsYXgnLFxuICAgIHNlY3VyZTogcmVxdWVzdFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOicsXG4gICAgbWF4QWdlOiAxMCAqIDYwLFxuICAgIHBhdGg6ICcvJyxcbiAgfSlcblxuICByZXR1cm4gcmVzcG9uc2Vcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjcnlwdG8iLCJnZXRPcmlnaW4iLCJyZXF1ZXN0IiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQUF9VUkwiLCJVUkwiLCJ1cmwiLCJvcmlnaW4iLCJHRVQiLCJjbGllbnRJZCIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInJlcXVlc3RVcmwiLCJtb2RlIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwicmVkaXJlY3QiLCJub25jZSIsInJhbmRvbUJ5dGVzIiwidG9TdHJpbmciLCJzdGF0ZSIsIkJ1ZmZlciIsImZyb20iLCJKU09OIiwic3RyaW5naWZ5IiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiY2xpZW50X2lkIiwicmVkaXJlY3RfdXJpIiwicmVzcG9uc2VfdHlwZSIsInNjb3BlIiwicHJvbXB0IiwicmVzcG9uc2UiLCJjb29raWVzIiwic2V0IiwiaHR0cE9ubHkiLCJzYW1lU2l0ZSIsInNlY3VyZSIsInByb3RvY29sIiwibWF4QWdlIiwicGF0aCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/google/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fgoogle%2Froute&page=%2Fapi%2Fauth%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fgoogle%2Froute.js&appDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fgoogle%2Froute&page=%2Fapi%2Fauth%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fgoogle%2Froute.js&appDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_chrome_downloads_Duramater_NextJS_main_Duramater_NextJS_main_app_api_auth_google_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/google/route.js */ \"(rsc)/./app/api/auth/google/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/google/route\",\n        pathname: \"/api/auth/google\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/google/route\"\n    },\n    resolvedPagePath: \"C:\\\\chrome downloads\\\\Duramater-NextJS-main\\\\Duramater-NextJS-main\\\\app\\\\api\\\\auth\\\\google\\\\route.js\",\n    nextConfigOutput,\n    userland: C_chrome_downloads_Duramater_NextJS_main_Duramater_NextJS_main_app_api_auth_google_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGZ29vZ2xlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGZ29vZ2xlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRmdvb2dsZSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDY2hyb21lJTIwZG93bmxvYWRzJTVDRHVyYW1hdGVyLU5leHRKUy1tYWluJTVDRHVyYW1hdGVyLU5leHRKUy1tYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDY2hyb21lJTIwZG93bmxvYWRzJTVDRHVyYW1hdGVyLU5leHRKUy1tYWluJTVDRHVyYW1hdGVyLU5leHRKUy1tYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNvRDtBQUNqSTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcY2hyb21lIGRvd25sb2Fkc1xcXFxEdXJhbWF0ZXItTmV4dEpTLW1haW5cXFxcRHVyYW1hdGVyLU5leHRKUy1tYWluXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxnb29nbGVcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvZ29vZ2xlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9nb29nbGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvZ29vZ2xlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcY2hyb21lIGRvd25sb2Fkc1xcXFxEdXJhbWF0ZXItTmV4dEpTLW1haW5cXFxcRHVyYW1hdGVyLU5leHRKUy1tYWluXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxnb29nbGVcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fgoogle%2Froute&page=%2Fapi%2Fauth%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fgoogle%2Froute.js&appDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fgoogle%2Froute&page=%2Fapi%2Fauth%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fgoogle%2Froute.js&appDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();