"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_data_1 = __importDefault(require("../../data/location-data"));
const emission_db_control_1 = require("./emission-db-control");
const router = express_1.default.Router();
exports.emissionRouter = router;
const renewPeriod = 10000;
let thisYearEmissionInfos = [];
let predictionEmissionInfos = [];
let permissibleEmission;
let todayEmissionChartInfos = [];
router.get('/', (req, res) => {
    const data = {
        thisYearEmission: thisYearEmissionInfos,
        permissibleEmission: permissibleEmission,
        predictionEmission: predictionEmissionInfos
    };
    res.send(JSON.stringify(data));
});
location_data_1.default.forEach((value) => {
    thisYearEmissionInfos.push({
        location: value.name,
        emission: 0
    });
    predictionEmissionInfos.push({
        location: value.name,
        emission: 0
    });
    todayEmissionChartInfos.push({
        location: value.name,
        table: []
    });
});
setInterval(() => {
    thisYearEmissionInfos.forEach((emissionInfo) => {
        emission_db_control_1.getThisYearEmission(emissionInfo.location, (emission) => {
            emissionInfo.emission = emission;
        });
    });
    emission_db_control_1.getPermissibleEmission((emission) => {
        permissibleEmission = emission;
    });
    predictionEmissionInfos.forEach((emissionInfo) => {
        emission_db_control_1.getPredictionEmission(emissionInfo.location, (emission) => {
            emissionInfo.emission = emission;
        });
    });
    todayEmissionChartInfos.forEach((emissionChartInfo) => {
        emission_db_control_1.getTodayEmissionTable(emissionChartInfo.location, (tableData) => {
            emissionChartInfo.table = tableData;
        });
    });
}, renewPeriod);
//# sourceMappingURL=emission-route.js.map