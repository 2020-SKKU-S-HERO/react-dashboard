import express, { Request, Response } from 'express';
import locationData, { LocationData } from '../../data/location-data';
import {
  getPastEmissionTable,
  getPermissibleEmission,
  getPredictionEmission, getPredictionEmissionTable,
  getThisYearEmission,
  getTodayEmissionTable
} from './emission-db-control';

const router: express.Router = express.Router();
export { router as emissionRouter };

const renewPeriod = 10000;

export type TimeSeriesData = {
  date: string,
  value: number
}

type EmissionDataForLocation = {
  location: { ko: string; en: string; };
  thisYearEmission: number;
  predictionEmission: number;
  todayEmissionTable: TimeSeriesData[];
  pastEmissionTable: TimeSeriesData[];
  predictionEmissionTable: TimeSeriesData[];
}

let emissionDataList: EmissionDataForLocation[] = [];
let permissibleEmission: number = 0;

router.get('/', (req: Request, res: Response): void => {
  const data = {
    emissionDataList: emissionDataList,
    permissibleEmission: permissibleEmission
  };
  
  res.send(JSON.stringify(data));
});

router.get('/pastEmission', (req: Request, res: Response): void => {
  const location: string = req.body.location;
  const fromDate: Date = new Date(req.body.fromDate);
  const toDate: Date = new Date(req.body.toDate);
  
  getPastEmissionTable(location, fromDate, toDate, (pastEmissionTable: TimeSeriesData[]): void => {
    res.send(pastEmissionTable);
  });
});

locationData.forEach((locationData: LocationData): void => {
  emissionDataList.push({
    location: { ko: locationData.name.ko, en: locationData.name.en },
    thisYearEmission: 0,
    predictionEmission: 0,
    todayEmissionTable: [],
    pastEmissionTable: [],
    predictionEmissionTable: []
  });
});

setInterval((): void => {
  emissionDataList.forEach((emissionData: EmissionDataForLocation): void => {
    // 오늘 배출량 설정
    getThisYearEmission(emissionData.location.ko, (emission: number): void => {
      emissionData.thisYearEmission = emission;
    });
    
    // 예상 배출량 설정
    getPredictionEmission(emissionData.location.ko, (emission: number): void => {
      emissionData.predictionEmission = emission;
    });
    
    // 오늘 배출량 테이블 설정
    getTodayEmissionTable(emissionData.location.ko, (tableData: TimeSeriesData[]): void => {
      emissionData.todayEmissionTable = tableData;
    });
    
    // 과거 배출량 테이블 설정
    const today: Date = new Date();
    const fromDate: Date = new Date(today.getFullYear(), 0, 1, 0, 0, 0);
    const toDate: Date = today;
    
    getPastEmissionTable(emissionData.location.ko, fromDate, toDate, (tableData: TimeSeriesData[]): void => {
      emissionData.pastEmissionTable = tableData;
    });
    
    // 예측 배출량 테이블 설정
    getPredictionEmissionTable(emissionData.location.ko, (tableData: TimeSeriesData[]): void => {
      emissionData.predictionEmissionTable = tableData;
    });
  });
  
  // 허용 배출량 설정
  getPermissibleEmission((emission: number): void => {
    permissibleEmission = emission;
  });
}, renewPeriod);