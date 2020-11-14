import React from 'react';
import { TableData } from '../table/table-type';
import CardTitle from '../card/CardTitle';
import PieChart from './PieChart';
import Table from '../table/Table';

type ResourceContributionChartProps = {};

const data = [
  [
    { label: '자원', type: 'string' },
    { label: '배출량', type: 'number' }
  ],
  ['화석연료', 200000],
  ['석회석', 80000],
  ['전기', 50000],
  ['기타', 5500],
];

const ResourceContributionChart: React.FC<ResourceContributionChartProps> = (): JSX.Element => {
  const tableData: TableData = {
    headers: [
      { name: '사업장', width: 80 },
      { name: '배출량' },
      { name: '기여도', width: 80 }
    ],
    dataset: [
      ['화석연료', '200K t', '59.6%'],
      ['석회석', '80K t', '23.8%'],
      ['전기', '50K t', '14.9%'],
      ['기타', '5.5K t', '1.6%'],
    ]
  }
  
  return (
    <>
      <CardTitle title="자원별 배출량 기여도"/>
      <PieChart data={data}/>
      <Table tableData={tableData}/>
    </>
  );
};

export default ResourceContributionChart;