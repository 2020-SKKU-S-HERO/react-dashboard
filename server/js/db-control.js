"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const db_info_1 = __importDefault(require("./secret/db-info"));
const connection = mysql_1.createConnection(db_info_1.default);
function getData(queryStr, onGetData) {
    connection.query(queryStr, (error, results, fields) => {
        if (error) {
            throw error;
        }
        onGetData(results);
    });
}
exports.getData = getData;
//# sourceMappingURL=db-control.js.map