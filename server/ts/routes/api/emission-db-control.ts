import { getData } from '../../db-control';
import { TimeSeriesData } from './emission-route';

export function getThisYearEmission(location: string, onGetEmission: ((emission: number) => void)): void {
  const queryStr: string = `
    SELECT yearly_emission.total_emission AS emission
    FROM (
      SELECT DATE_FORMAT(date_time, '%Y') AS thisYear, SUM(emissions) AS total_emission
      FROM co2_emissions
      WHERE location = '${location}'
      GROUP BY thisYear) AS yearly_emission
    WHERE yearly_emission.thisYear = DATE_FORMAT(NOW(), '%Y');
  `;
  
  getData(queryStr, (data: any): void => {
    if (data.length !== 0) {
      onGetEmission(Number(data[0]['emission']));
    } else {
      onGetEmission(0);
    }
  });
}

export function getPermissibleEmission(onGetPermissibleEmission: ((permissibleEmission: number) => void)): void {
  const queryStr: string = `
      SELECT emissions_limit
      FROM permissible_emissions_limit
      WHERE year = DATE_FORMAT(NOW(), '%Y');
  `;
  
  getData(queryStr, (data: any): void => {
    onGetPermissibleEmission(Number(data[0]['emissions_limit']));
  });
}

export function getPredictionEmission(location: string, onGetPredictionEmission: ((predictionEmission: number) => void)): void {
  const queryStr: string = `
    SELECT yearly_emission.total_emission AS emission
    FROM (
      SELECT DATE_FORMAT(date_time, '%Y') AS thisYear, SUM(predict_value) AS total_emission
      FROM predict_value
      WHERE location = '${location}'
      GROUP BY thisYear) AS yearly_emission
    WHERE yearly_emission.thisYear = DATE_FORMAT(NOW(), '%Y');
  `;
  
  getData(queryStr, (data: any): void => {
    if (data.length !== 0) {
      onGetPredictionEmission(Number(data[0]['emission']));
    } else {
      onGetPredictionEmission(0);
    }
  });
}

export function getTodayEmissionTable(location: string, onGetTodayEmissionTable: ((todayEmissionTable: TimeSeriesData[]) => void)): void {
  const queryStr: string = `
      SELECT date_time, emissions
      FROM co2_emissions
      WHERE date_time >= DATE_FORMAT(NOW(), '%Y-%m-%d 00:00:00')
        AND date_time < DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), '%Y-%m-%d 00:00:00')
        AND location = '${location}';
  `;
  
  getData(queryStr, (data: any): void => {
    let table: TimeSeriesData[] = [];
    
    data.forEach((col: any): void => {
      table.push({
        date: col['date_time'],
        value: col['emissions']
      })
    });
  
    onGetTodayEmissionTable(table);
  });
}

export function getPastEmissionTable(location: string | undefined, fromDate: Date, toDate: Date, onGetPastEmissionTable: ((pastEmissionTable: TimeSeriesData[]) => void)): void {
  let queryStr: string;
  
  if (location) {
    queryStr = `
      SELECT date_time, emissions
      FROM co2_emissions
      WHERE date_time >= '${fromDate.toISOString()}'
        AND date_time <= '${toDate.toISOString()}'
        AND location = '${location}';
    `;
  } else {
    queryStr = `
      SELECT date_time, emissions
      FROM co2_emissions
      WHERE date_time >= '${fromDate.toISOString()}'
        AND date_time <= '${toDate.toISOString()}'
    `;
  }
  
  getData(queryStr, (data: any): void => {
    let table: TimeSeriesData[] = [];
    
    data.forEach((col: any): void => {
      table.push({
        date: col['date_time'],
        value: col['emissions']
      })
    });
  
    onGetPastEmissionTable(table);
  });
}

export function getPredictionEmissionTable(location: string, onGetPredictionEmissionTable: ((predictionEmissionTable: TimeSeriesData[]) => void)): void {
  const queryStr: string = `
      SELECT date_time, predict_value
      FROM predict_value
      WHERE date_time >= DATE_FORMAT(NOW(), '%Y-01-01 00:00:00')
        AND date_time < DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 YEAR ), '%Y-01-01 00:00:00')
        AND location = '${location}';
  `;
  
  getData(queryStr, (data: any): void => {
    let table: TimeSeriesData[] = [];
    
    data.forEach((col: any): void => {
      table.push({
        date: col['date_time'],
        value: col['predict_value']
      })
    });
  
    onGetPredictionEmissionTable(table);
  });
}