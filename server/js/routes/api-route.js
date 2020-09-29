"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emission_route_1 = require("./api/emission-route");
const router = express_1.default.Router();
exports.apiRouter = router;
router.use('/emission', emission_route_1.emissionRouter);
//# sourceMappingURL=api-route.js.map