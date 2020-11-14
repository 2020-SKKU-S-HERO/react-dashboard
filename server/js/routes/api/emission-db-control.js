"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_control_1 = require("../../db-control");
function getThisYearEmission(location, onGetEmission) {
    const queryStr = `
    SELECT yearly_emission.total_emission AS emission
    FROM (
      SELECT DATE_FORMAT(date_time, '%Y') AS thisYear, SUM(emissions) AS total_emission
      FROM co2_emissions
      WHERE location = '${location}'
      GROUP BY thisYear) AS yearly_emission
    WHERE yearly_emission.thisYear = DATE_FORMAT(NOW(), '%Y');
  `;
    db_control_1.getData(queryStr, (data) => {
        if (data.length !== 0) {
            onGetEmission(Number(data[0]['emission']));
        }
        else {
            onGetEmission(0);
        }
    });
}
exports.getThisYearEmission = getThisYearEmission;
function getPermissibleEmission(onGetPermissibleEmission) {
    const queryStr = `
      SELECT emissions_limit
      FROM permissible_emissions_limit
      WHERE year = DATE_FORMAT(NOW(), '%Y');
  `;
    db_control_1.getData(queryStr, (data) => {
        onGetPermissibleEmission(Number(data[0]['emissions_limit']));
    });
}
exports.getPermissibleEmission = getPermissibleEmission;
function getPredictionEmission(location, onGetPredictionEmission) {
    const queryStr = `
    SELECT yearly_emission.total_emission AS emission
    FROM (
      SELECT DATE_FORMAT(date_time, '%Y') AS thisYear, SUM(predict_value) AS total_emission
      FROM predict_value
      WHERE location = '${location}'
      GROUP BY thisYear) AS yearly_emission
    WHERE yearly_emission.thisYear = DATE_FORMAT(NOW(), '%Y');
  `;
    db_control_1.getData(queryStr, (data) => {
        if (data.length !== 0) {
            onGetPredictionEmission(Number(data[0]['emission']));
        }
        else {
            onGetPredictionEmission(0);
        }
    });
}
exports.getPredictionEmission = getPredictionEmission;
function getTodayEmissionTable(location, onGetTodayEmissionTable) {
    const queryStr = `
      SELECT date_time, emissions
      FROM co2_emissions
      WHERE date_time >= DATE_FORMAT(NOW(), '%Y-%m-%d 00:00:00')
        AND date_time < DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), '%Y-%m-%d 00:00:00')
        AND location = '${location}';
  `;
    db_control_1.getData(queryStr, (data) => {
        let table = [];
        data.forEach((col) => {
            table.push({
                date: col['date_time'],
                value: col['emissions']
            });
        });
        onGetTodayEmissionTable(table);
    });
}
exports.getTodayEmissionTable = getTodayEmissionTable;
function getPastEmissionTable(location, fromDate, toDate, onGetPastEmissionTable) {
    let queryStr;
    if (location) {
        queryStr = `
      SELECT date_time, emissions
      FROM co2_emissions
      WHERE date_time >= '${fromDate.toISOString()}'
        AND date_time <= '${toDate.toISOString()}'
        AND location = '${location}';
    `;
    }
    else {
        queryStr = `
      SELECT date_time, emissions
      FROM co2_emissions
      WHERE date_time >= '${fromDate.toISOString()}'
        AND date_time <= '${toDate.toISOString()}'
    `;
    }
    db_control_1.getData(queryStr, (data) => {
        let table = [];
        data.forEach((col) => {
            table.push({
                date: col['date_time'],
                value: col['emissions']
            });
        });
        onGetPastEmissionTable(table);
    });
}
exports.getPastEmissionTable = getPastEmissionTable;
function getPredictionEmissionTable(location, onGetPredictionEmissionTable) {
    const queryStr = `
      SELECT date_time, predict_value
      FROM predict_value
      WHERE date_time >= DATE_FORMAT(NOW(), '%Y-01-01 00:00:00')
        AND date_time < DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 YEAR ), '%Y-01-01 00:00:00')
        AND location = '${location}';
  `;
    db_control_1.getData(queryStr, (data) => {
        let table = [];
        data.forEach((col) => {
            table.push({
                date: col['date_time'],
                value: col['predict_value']
            });
        });
        onGetPredictionEmissionTable(table);
    });
}
exports.getPredictionEmissionTable = getPredictionEmissionTable;
//# sourceMappingURL=emission-db-control.js.map