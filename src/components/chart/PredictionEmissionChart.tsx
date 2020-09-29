import React from 'react';
import color from '../color/color';
import Chart from 'react-google-charts';
import CardTitle from '../card/CardTitle';
import CardDescription from '../card/CardDescription';
import { DescriptionData } from '../card/card-type';

type PredictionEmissionChartProps = {};

const options = {
  vAxis: {
    format: 'short',
    viewWindow: {
      min: 0
    }
  },
  hAxis: {
    format: 'M월',
    minValue: new Date(2020, 2, 1)
  },
  series: {
    0: { curveType: 'function' },
    1: { curveType: 'function' }
  },
  colors: [
    color.violet.vivid,
    color.cyan.vivid
  ],
  legend: {
    position: 'top',
    alignment: 'end',
    textStyle: {
      fontSize: 15
    }
  },
  chartArea: {
    top: 20,
    bottom: 40,
    left: 50,
    right: 25
  },
  pointSize: 5,
  pointShape: 'circle',
  focusTarget: 'category',
  fontName: 'Noto Sans KR',
  fontSize: 14
};

const data: any = [
  [
    'date',
    '배출량',
    '예측 배출량'
  ],
  [new Date(2020, 0), 15, 16],
  [new Date(2020, 1), 19, 17],
  [new Date(2020, 2), 17, 18],
  [new Date(2020, 3), 14, 14],
  [new Date(2020, 4), 10, 9],
  [new Date(2020, 5), 15, 16],
  [new Date(2020, 6), 16, 15],
  [new Date(2020, 7), 21, 22],
  [new Date(2020, 8), 8, 9],
  [new Date(2020, 9), 21, 20],
  [new Date(2020, 10), 16, 16],
  [new Date(2020, 11), 11, 12]
];


const PredictionEmissionChart: React.FC<PredictionEmissionChartProps> = (): JSX.Element => {
  const descriptionDataset: DescriptionData[] = [
    {
      value: '60K t',
      description: '예상되는 총 배출량'
    },
    {
      value: '5 t',
      description: '오차 평균'
    }
  ];
  
  return (
    <>
      <CardTitle title="예측 배출량"/>
      <Chart
        width={'100%'}
        height={'300px'}
        style={{marginTop: 5}}
        chartType="LineChart"
        options={options}
        data={data}
        formatters={[
          {
            type: 'DateFormat',
            column: 0,
            options: {
              pattern: 'M월'
            }
          },
          {
            type: 'NumberFormat',
            column: 1,
            options: {
              suffix: ' t',
              fractionDigits: 0
            }
          },
          {
            type: 'NumberFormat',
            column: 2,
            options: {
              suffix: ' t',
              fractionDigits: 0
            }
          }
        ]}
      />
      <CardDescription dataset={descriptionDataset} />
    </>
  );
};

export default PredictionEmissionChart;