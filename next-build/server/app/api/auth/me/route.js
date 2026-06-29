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
exports.id = "app/api/auth/me/route";
exports.ids = ["app/api/auth/me/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/me/route.js":
/*!**********************************!*\
  !*** ./app/api/auth/me/route.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_authToken_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/authToken.js */ \"(rsc)/./app/lib/authToken.js\");\n\n\nasync function GET(request) {\n    const auth = request.headers.get('authorization') || '';\n    const token = auth.startsWith('Bearer ') ? auth.slice(7) : request.cookies.get('auth_token')?.value;\n    const user = (0,_lib_authToken_js__WEBPACK_IMPORTED_MODULE_1__.verifyAuthToken)(token);\n    if (!user) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Invalid token'\n        }, {\n            status: 401\n        });\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        id: user.id || user.sub,\n        email: user.email,\n        name: user.name,\n        picture: user.picture,\n        provider: user.provider\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbWUvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBDO0FBQ2lCO0FBRXBELGVBQWVFLElBQUlDLE9BQU87SUFDL0IsTUFBTUMsT0FBT0QsUUFBUUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsb0JBQW9CO0lBQ3JELE1BQU1DLFFBQVFILEtBQUtJLFVBQVUsQ0FBQyxhQUFhSixLQUFLSyxLQUFLLENBQUMsS0FBS04sUUFBUU8sT0FBTyxDQUFDSixHQUFHLENBQUMsZUFBZUs7SUFDOUYsTUFBTUMsT0FBT1gsa0VBQWVBLENBQUNNO0lBRTdCLElBQUksQ0FBQ0ssTUFBTTtRQUNULE9BQU9aLHFEQUFZQSxDQUFDYSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFnQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNyRTtJQUVBLE9BQU9mLHFEQUFZQSxDQUFDYSxJQUFJLENBQUM7UUFDdkJHLElBQUlKLEtBQUtJLEVBQUUsSUFBSUosS0FBS0ssR0FBRztRQUN2QkMsT0FBT04sS0FBS00sS0FBSztRQUNqQkMsTUFBTVAsS0FBS08sSUFBSTtRQUNmQyxTQUFTUixLQUFLUSxPQUFPO1FBQ3JCQyxVQUFVVCxLQUFLUyxRQUFRO0lBQ3pCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxjaHJvbWUgZG93bmxvYWRzXFxEdXJhbWF0ZXItTmV4dEpTLW1haW5cXER1cmFtYXRlci1OZXh0SlMtbWFpblxcYXBwXFxhcGlcXGF1dGhcXG1lXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IHZlcmlmeUF1dGhUb2tlbiB9IGZyb20gJy4uLy4uLy4uL2xpYi9hdXRoVG9rZW4uanMnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdCkge1xuICBjb25zdCBhdXRoID0gcmVxdWVzdC5oZWFkZXJzLmdldCgnYXV0aG9yaXphdGlvbicpIHx8ICcnXG4gIGNvbnN0IHRva2VuID0gYXV0aC5zdGFydHNXaXRoKCdCZWFyZXIgJykgPyBhdXRoLnNsaWNlKDcpIDogcmVxdWVzdC5jb29raWVzLmdldCgnYXV0aF90b2tlbicpPy52YWx1ZVxuICBjb25zdCB1c2VyID0gdmVyaWZ5QXV0aFRva2VuKHRva2VuKVxuXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSW52YWxpZCB0b2tlbicgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICB9XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICBpZDogdXNlci5pZCB8fCB1c2VyLnN1YixcbiAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgcGljdHVyZTogdXNlci5waWN0dXJlLFxuICAgIHByb3ZpZGVyOiB1c2VyLnByb3ZpZGVyLFxuICB9KVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInZlcmlmeUF1dGhUb2tlbiIsIkdFVCIsInJlcXVlc3QiLCJhdXRoIiwiaGVhZGVycyIsImdldCIsInRva2VuIiwic3RhcnRzV2l0aCIsInNsaWNlIiwiY29va2llcyIsInZhbHVlIiwidXNlciIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImlkIiwic3ViIiwiZW1haWwiLCJuYW1lIiwicGljdHVyZSIsInByb3ZpZGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/me/route.js\n");

/***/ }),

/***/ "(rsc)/./app/lib/authToken.js":
/*!******************************!*\
  !*** ./app/lib/authToken.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   signAuthToken: () => (/* binding */ signAuthToken),\n/* harmony export */   verifyAuthToken: () => (/* binding */ verifyAuthToken)\n/* harmony export */ });\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:crypto */ \"node:crypto\");\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nconst TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;\nfunction base64url(input) {\n    return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\\+/g, '-').replace(/\\//g, '_');\n}\nfunction decodeBase64url(input) {\n    const normalized = input.replace(/-/g, '+').replace(/_/g, '/');\n    return Buffer.from(normalized, 'base64').toString('utf8');\n}\nfunction getAuthSecret() {\n    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;\n    if (secret) return secret;\n    if (false) {}\n    return 'duramater-local-dev-secret';\n}\nfunction signAuthToken(user) {\n    const now = Math.floor(Date.now() / 1000);\n    const header = {\n        alg: 'HS256',\n        typ: 'JWT'\n    };\n    const payload = {\n        ...user,\n        iat: now,\n        exp: now + TOKEN_TTL_SECONDS\n    };\n    const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;\n    const signature = node_crypto__WEBPACK_IMPORTED_MODULE_0___default().createHmac('sha256', getAuthSecret()).update(unsigned).digest('base64url');\n    return `${unsigned}.${signature}`;\n}\nfunction verifyAuthToken(token) {\n    if (!token || typeof token !== 'string') return null;\n    const parts = token.split('.');\n    if (parts.length !== 3) return null;\n    const [header, payload, signature] = parts;\n    const unsigned = `${header}.${payload}`;\n    const expected = node_crypto__WEBPACK_IMPORTED_MODULE_0___default().createHmac('sha256', getAuthSecret()).update(unsigned).digest('base64url');\n    const provided = Buffer.from(signature);\n    const valid = Buffer.from(expected);\n    if (provided.length !== valid.length || !node_crypto__WEBPACK_IMPORTED_MODULE_0___default().timingSafeEqual(provided, valid)) {\n        return null;\n    }\n    try {\n        const data = JSON.parse(decodeBase64url(payload));\n        if (data.exp && data.exp < Math.floor(Date.now() / 1000)) return null;\n        return data;\n    } catch  {\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL2F1dGhUb2tlbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLG9CQUFvQixLQUFLLEtBQUssS0FBSztBQUV6QyxTQUFTQyxVQUFVQyxLQUFLO0lBQ3RCLE9BQU9DLE9BQU9DLElBQUksQ0FBQ0YsT0FDaEJHLFFBQVEsQ0FBQyxVQUNUQyxPQUFPLENBQUMsTUFBTSxJQUNkQSxPQUFPLENBQUMsT0FBTyxLQUNmQSxPQUFPLENBQUMsT0FBTztBQUNwQjtBQUVBLFNBQVNDLGdCQUFnQkwsS0FBSztJQUM1QixNQUFNTSxhQUFhTixNQUFNSSxPQUFPLENBQUMsTUFBTSxLQUFLQSxPQUFPLENBQUMsTUFBTTtJQUMxRCxPQUFPSCxPQUFPQyxJQUFJLENBQUNJLFlBQVksVUFBVUgsUUFBUSxDQUFDO0FBQ3BEO0FBRUEsU0FBU0k7SUFDUCxNQUFNQyxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLFdBQVcsSUFBSUYsUUFBUUMsR0FBRyxDQUFDRSxlQUFlO0lBQ3JFLElBQUlKLFFBQVEsT0FBT0E7SUFDbkIsSUFBSUMsS0FBcUMsRUFBRSxFQUUxQztJQUNELE9BQU87QUFDVDtBQUVPLFNBQVNLLGNBQWNDLElBQUk7SUFDaEMsTUFBTUMsTUFBTUMsS0FBS0MsS0FBSyxDQUFDQyxLQUFLSCxHQUFHLEtBQUs7SUFDcEMsTUFBTUksU0FBUztRQUFFQyxLQUFLO1FBQVNDLEtBQUs7SUFBTTtJQUMxQyxNQUFNQyxVQUFVO1FBQ2QsR0FBR1IsSUFBSTtRQUNQUyxLQUFLUjtRQUNMUyxLQUFLVCxNQUFNbEI7SUFDYjtJQUVBLE1BQU00QixXQUFXLEdBQUczQixVQUFVNEIsS0FBS0MsU0FBUyxDQUFDUixTQUFTLENBQUMsRUFBRXJCLFVBQVU0QixLQUFLQyxTQUFTLENBQUNMLFdBQVc7SUFDN0YsTUFBTU0sWUFBWWhDLDZEQUNMLENBQUMsVUFBVVUsaUJBQ3JCd0IsTUFBTSxDQUFDTCxVQUNQTSxNQUFNLENBQUM7SUFFVixPQUFPLEdBQUdOLFNBQVMsQ0FBQyxFQUFFRyxXQUFXO0FBQ25DO0FBRU8sU0FBU0ksZ0JBQWdCQyxLQUFLO0lBQ25DLElBQUksQ0FBQ0EsU0FBUyxPQUFPQSxVQUFVLFVBQVUsT0FBTztJQUVoRCxNQUFNQyxRQUFRRCxNQUFNRSxLQUFLLENBQUM7SUFDMUIsSUFBSUQsTUFBTUUsTUFBTSxLQUFLLEdBQUcsT0FBTztJQUUvQixNQUFNLENBQUNqQixRQUFRRyxTQUFTTSxVQUFVLEdBQUdNO0lBQ3JDLE1BQU1ULFdBQVcsR0FBR04sT0FBTyxDQUFDLEVBQUVHLFNBQVM7SUFDdkMsTUFBTWUsV0FBV3pDLDZEQUNKLENBQUMsVUFBVVUsaUJBQ3JCd0IsTUFBTSxDQUFDTCxVQUNQTSxNQUFNLENBQUM7SUFFVixNQUFNTyxXQUFXdEMsT0FBT0MsSUFBSSxDQUFDMkI7SUFDN0IsTUFBTVcsUUFBUXZDLE9BQU9DLElBQUksQ0FBQ29DO0lBQzFCLElBQUlDLFNBQVNGLE1BQU0sS0FBS0csTUFBTUgsTUFBTSxJQUFJLENBQUN4QyxrRUFBc0IsQ0FBQzBDLFVBQVVDLFFBQVE7UUFDaEYsT0FBTztJQUNUO0lBRUEsSUFBSTtRQUNGLE1BQU1FLE9BQU9mLEtBQUtnQixLQUFLLENBQUN0QyxnQkFBZ0JrQjtRQUN4QyxJQUFJbUIsS0FBS2pCLEdBQUcsSUFBSWlCLEtBQUtqQixHQUFHLEdBQUdSLEtBQUtDLEtBQUssQ0FBQ0MsS0FBS0gsR0FBRyxLQUFLLE9BQU8sT0FBTztRQUNqRSxPQUFPMEI7SUFDVCxFQUFFLE9BQU07UUFDTixPQUFPO0lBQ1Q7QUFDRiIsInNvdXJjZXMiOlsiQzpcXGNocm9tZSBkb3dubG9hZHNcXER1cmFtYXRlci1OZXh0SlMtbWFpblxcRHVyYW1hdGVyLU5leHRKUy1tYWluXFxhcHBcXGxpYlxcYXV0aFRva2VuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcnlwdG8gZnJvbSAnbm9kZTpjcnlwdG8nXG5cbmNvbnN0IFRPS0VOX1RUTF9TRUNPTkRTID0gNjAgKiA2MCAqIDI0ICogN1xuXG5mdW5jdGlvbiBiYXNlNjR1cmwoaW5wdXQpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGlucHV0KVxuICAgIC50b1N0cmluZygnYmFzZTY0JylcbiAgICAucmVwbGFjZSgvPS9nLCAnJylcbiAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAucmVwbGFjZSgvXFwvL2csICdfJylcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmFzZTY0dXJsKGlucHV0KSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBpbnB1dC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpXG4gIHJldHVybiBCdWZmZXIuZnJvbShub3JtYWxpemVkLCAnYmFzZTY0JykudG9TdHJpbmcoJ3V0ZjgnKVxufVxuXG5mdW5jdGlvbiBnZXRBdXRoU2VjcmV0KCkge1xuICBjb25zdCBzZWNyZXQgPSBwcm9jZXNzLmVudi5BVVRIX1NFQ1JFVCB8fCBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVRcbiAgaWYgKHNlY3JldCkgcmV0dXJuIHNlY3JldFxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignQVVUSF9TRUNSRVQgaXMgcmVxdWlyZWQgaW4gcHJvZHVjdGlvbi4nKVxuICB9XG4gIHJldHVybiAnZHVyYW1hdGVyLWxvY2FsLWRldi1zZWNyZXQnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaWduQXV0aFRva2VuKHVzZXIpIHtcbiAgY29uc3Qgbm93ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMClcbiAgY29uc3QgaGVhZGVyID0geyBhbGc6ICdIUzI1NicsIHR5cDogJ0pXVCcgfVxuICBjb25zdCBwYXlsb2FkID0ge1xuICAgIC4uLnVzZXIsXG4gICAgaWF0OiBub3csXG4gICAgZXhwOiBub3cgKyBUT0tFTl9UVExfU0VDT05EUyxcbiAgfVxuXG4gIGNvbnN0IHVuc2lnbmVkID0gYCR7YmFzZTY0dXJsKEpTT04uc3RyaW5naWZ5KGhlYWRlcikpfS4ke2Jhc2U2NHVybChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSl9YFxuICBjb25zdCBzaWduYXR1cmUgPSBjcnlwdG9cbiAgICAuY3JlYXRlSG1hYygnc2hhMjU2JywgZ2V0QXV0aFNlY3JldCgpKVxuICAgIC51cGRhdGUodW5zaWduZWQpXG4gICAgLmRpZ2VzdCgnYmFzZTY0dXJsJylcblxuICByZXR1cm4gYCR7dW5zaWduZWR9LiR7c2lnbmF0dXJlfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeUF1dGhUb2tlbih0b2tlbikge1xuICBpZiAoIXRva2VuIHx8IHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycpIHJldHVybiBudWxsXG5cbiAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdCgnLicpXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsXG5cbiAgY29uc3QgW2hlYWRlciwgcGF5bG9hZCwgc2lnbmF0dXJlXSA9IHBhcnRzXG4gIGNvbnN0IHVuc2lnbmVkID0gYCR7aGVhZGVyfS4ke3BheWxvYWR9YFxuICBjb25zdCBleHBlY3RlZCA9IGNyeXB0b1xuICAgIC5jcmVhdGVIbWFjKCdzaGEyNTYnLCBnZXRBdXRoU2VjcmV0KCkpXG4gICAgLnVwZGF0ZSh1bnNpZ25lZClcbiAgICAuZGlnZXN0KCdiYXNlNjR1cmwnKVxuXG4gIGNvbnN0IHByb3ZpZGVkID0gQnVmZmVyLmZyb20oc2lnbmF0dXJlKVxuICBjb25zdCB2YWxpZCA9IEJ1ZmZlci5mcm9tKGV4cGVjdGVkKVxuICBpZiAocHJvdmlkZWQubGVuZ3RoICE9PSB2YWxpZC5sZW5ndGggfHwgIWNyeXB0by50aW1pbmdTYWZlRXF1YWwocHJvdmlkZWQsIHZhbGlkKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGRlY29kZUJhc2U2NHVybChwYXlsb2FkKSlcbiAgICBpZiAoZGF0YS5leHAgJiYgZGF0YS5leHAgPCBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSkgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gZGF0YVxuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iXSwibmFtZXMiOlsiY3J5cHRvIiwiVE9LRU5fVFRMX1NFQ09ORFMiLCJiYXNlNjR1cmwiLCJpbnB1dCIsIkJ1ZmZlciIsImZyb20iLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJkZWNvZGVCYXNlNjR1cmwiLCJub3JtYWxpemVkIiwiZ2V0QXV0aFNlY3JldCIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJBVVRIX1NFQ1JFVCIsIk5FWFRBVVRIX1NFQ1JFVCIsIkVycm9yIiwic2lnbkF1dGhUb2tlbiIsInVzZXIiLCJub3ciLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiaGVhZGVyIiwiYWxnIiwidHlwIiwicGF5bG9hZCIsImlhdCIsImV4cCIsInVuc2lnbmVkIiwiSlNPTiIsInN0cmluZ2lmeSIsInNpZ25hdHVyZSIsImNyZWF0ZUhtYWMiLCJ1cGRhdGUiLCJkaWdlc3QiLCJ2ZXJpZnlBdXRoVG9rZW4iLCJ0b2tlbiIsInBhcnRzIiwic3BsaXQiLCJsZW5ndGgiLCJleHBlY3RlZCIsInByb3ZpZGVkIiwidmFsaWQiLCJ0aW1pbmdTYWZlRXF1YWwiLCJkYXRhIiwicGFyc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/authToken.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.js&appDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.js&appDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_chrome_downloads_Duramater_NextJS_main_Duramater_NextJS_main_app_api_auth_me_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/me/route.js */ \"(rsc)/./app/api/auth/me/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/me/route\",\n        pathname: \"/api/auth/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/me/route\"\n    },\n    resolvedPagePath: \"C:\\\\chrome downloads\\\\Duramater-NextJS-main\\\\Duramater-NextJS-main\\\\app\\\\api\\\\auth\\\\me\\\\route.js\",\n    nextConfigOutput,\n    userland: C_chrome_downloads_Duramater_NextJS_main_Duramater_NextJS_main_app_api_auth_me_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbWUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDY2hyb21lJTIwZG93bmxvYWRzJTVDRHVyYW1hdGVyLU5leHRKUy1tYWluJTVDRHVyYW1hdGVyLU5leHRKUy1tYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDY2hyb21lJTIwZG93bmxvYWRzJTVDRHVyYW1hdGVyLU5leHRKUy1tYWluJTVDRHVyYW1hdGVyLU5leHRKUy1tYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNnRDtBQUM3SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcY2hyb21lIGRvd25sb2Fkc1xcXFxEdXJhbWF0ZXItTmV4dEpTLW1haW5cXFxcRHVyYW1hdGVyLU5leHRKUy1tYWluXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxtZVxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9tZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvbWVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvbWUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxjaHJvbWUgZG93bmxvYWRzXFxcXER1cmFtYXRlci1OZXh0SlMtbWFpblxcXFxEdXJhbWF0ZXItTmV4dEpTLW1haW5cXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXG1lXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.js&appDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.js&appDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cchrome%20downloads%5CDuramater-NextJS-main%5CDuramater-NextJS-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();