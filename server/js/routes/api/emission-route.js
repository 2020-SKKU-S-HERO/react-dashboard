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
let emissionDataList = [];
let permissibleEmission = 0;
router.get('/', (req, res) => {
    const data = {
        emissionDataList: emissionDataList,
        permissibleEmission: permissibleEmission
    };
    res.send(JSON.stringify(data));
});
router.get('/pastEmission', (req, res) => {
    const location = req.body.location;
    const fromDate = new Date(req.body.fromDate);
    const toDate = new Date(req.body.toDate);
    emission_db_control_1.getPastEmissionTable(location, fromDate, toDate, (pastEmissionTable) => {
        res.send(pastEmissionTable);
    });
});
location_data_1.default.forEach((locationData) => {
    emissionDataList.push({
        location: { ko: locationData.name.ko, en: locationData.name.en },
        thisYearEmission: 0,
        predictionEmission: 0,
        todayEmissionTable: [],
        pastEmissionTable: [],
        predictionEmissionTable: []
    });
});
setInterval(() => {
    emissionDataList.forEach((emissionData) => {
        emission_db_control_1.getThisYearEmission(emissionData.location.ko, (emission) => {
            emissionData.thisYearEmission = emission;
        });
        emission_db_control_1.getPredictionEmission(emissionData.location.ko, (emission) => {
            emissionData.predictionEmission = emission;
        });
        emission_db_control_1.getTodayEmissionTable(emissionData.location.ko, (tableData) => {
            emissionData.todayEmissionTable = tableData;
        });
        const today = new Date();
        const fromDate = new Date(today.getFullYear(), 0, 1, 0, 0, 0);
        const toDate = today;
        emission_db_control_1.getPastEmissionTable(emissionData.location.ko, fromDate, toDate, (tableData) => {
            emissionData.pastEmissionTable = tableData;
        });
        emission_db_control_1.getPredictionEmissionTable(emissionData.location.ko, (tableData) => {
            emissionData.predictionEmissionTable = tableData;
        });
    });
    emission_db_control_1.getPermissibleEmission((emission) => {
        permissibleEmission = emission;
    });
}, renewPeriod);
//# sourceMappingURL=emission-route.js.map