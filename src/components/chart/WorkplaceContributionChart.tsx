import React from 'react';
import CardTitle from '../card/CardTitle';
import PieChart from './PieChart';
import Table from '../table/Table';
import { TableData } from '../table/table-type';
import { EmissionDataForLocation, EmissionDataState, useEmissionState } from '../context/EmissionContext';
import { abbreviateNumber } from '../script/common';
import { Chart } from 'react-google-charts';

type WorkplaceContributionChartProps = {};

const WorkplaceContributionChart: React.FC<WorkplaceContributionChartProps> = (): JSX.Element => {
  const emissionState: EmissionDataState = useEmissionState();
  let sumOfEmission: number = 0;
  
  emissionState.emissionData.emissionDataList.map((data: EmissionDataForLocation): void => {
    sumOfEmission += data.thisYearEmission;
  });
  
  let chartData: ({label: string, type: string}[] | [string, number])[] = [
    [
      { label: '사업장', type: 'string' },
      { label: '배출량', type: 'number' }
    ]
  ];
  
  let chartFormatters = [
    {
      type: 'NumberFormat',
      column: 1,
      options: {
        suffix: ' t',
        fractionDigits: 0
      }
    }
  ];
  
  let tableData: TableData = {
    headers: [
      { name: '사업장', width: 80 },
      { name: '배출량' },
      { name: '기여도', width: 80 }
    ],
    dataset: [
    ]
  }
  
  emissionState.emissionData.emissionDataList.map((data: EmissionDataForLocation): void => {
    chartData.push([data.location.ko, data.thisYearEmission]);
    tableData.dataset.push([data.location.ko, abbreviateNumber(data.thisYearEmission), (data.thisYearEmission / sumOfEmission * 100).toFixed(1) + '%'])
  });
  
  return (
    <>
      <CardTitle title="사업장별 배출량 기여도"/>
      <PieChart data={chartData} formatters={chartFormatters}/>
      <Table tableData={tableData}/>
    </>
  );
};

export default WorkplaceContributionChart;