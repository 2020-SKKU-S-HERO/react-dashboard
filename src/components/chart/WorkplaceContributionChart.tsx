import React from 'react';
import CardTitle from '../card/CardTitle';
import PieChart from './PieChart';
import Table from '../table/Table';
import { TableData } from '../table/table-type';

type WorkplaceContributionChartProps = {};

const data = [
  [
    { label: '사업장', type: 'string' },
    { label: '배출량', type: 'number' }
  ],
  ['병점', 15000],
  ['수원', 20000],
  ['인천', 10000]
];

const WorkplaceContributionChart: React.FC<WorkplaceContributionChartProps> = (): JSX.Element => {
  const tableData: TableData = {
    headers: [
      { name: '사업장', width: 80 },
      { name: '배출량' },
      { name: '기여도', width: 80 }
    ],
    dataset: [
      ['병점', '15K t', '33.3%'],
      ['수원', '20K t', '44.4%'],
      ['인천', '10K t', '22.2%']
    ]
  }
  
  return (
    <>
      <CardTitle title="배출량 기여도"/>
      <PieChart data={data}/>
      <Table tableData={tableData}/>
    </>
  );
};

export default WorkplaceContributionChart;