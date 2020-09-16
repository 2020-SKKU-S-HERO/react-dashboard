"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = 5000;
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'development') {
    app.use('/', http_proxy_middleware_1.createProxyMiddleware({ target: 'http://192.168.0.20:3000', changeOrigin: true }));
    app.listen(port, () => {
        console.log('Dev mode express is listening on port', port);
    });
}
else if (process.env.NODE_ENV === 'production') {
    app.use('/', express_1.default.static('build'));
    app.listen(port, () => {
        console.log('Express is listening on port', port);
    });
}
//# sourceMappingURL=main.js.map