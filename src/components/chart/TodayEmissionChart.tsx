import React from 'react';
import Chart from 'react-google-charts';
import color from '../color/color';
import CardTitle from '../card/CardTitle';
import CardDescription from '../card/CardDescription';
import { DescriptionData } from '../card/card-type';

type TodayEmissionChartProps = {};

const options = {
  vAxis: {
    format: 'short',
    viewWindow: {
      min: 0
    }
  },
  hAxis: {
    format: 'H시'
  },
  series: {
    0: {
      curveType: 'function',
      color: color.violet.vivid
    },
    1: {
      pointSize: 0,
      lineDashStyle: [4, 8],
      color: color.violet.vivid,
      enableInteractivity: false
    }
  },
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
  fontSize: 14,
  tooltip: {
    showColorCode: false
  }
};

const data: any = [
  [
    'date',
    '배출량',
    '평균'
  ],
  [new Date(2020, 9, 18, 0, 0, 0), 15, 45],
  [new Date(2020, 9, 18, 1, 0, 0), 20, 45],
  [new Date(2020, 9, 18, 2, 0, 0), 48, 45],
  [new Date(2020, 9, 18, 3, 0, 0), 11, 45],
  [new Date(2020, 9, 18, 4, 0, 0), 45, 45],
  [new Date(2020, 9, 18, 5, 0, 0), 64, 45],
  [new Date(2020, 9, 18, 6, 0, 0), 24, 45],
  [new Date(2020, 9, 18, 7, 0, 0), 34, 45],
  [new Date(2020, 9, 18, 8, 0, 0), 25, 45],
  [new Date(2020, 9, 18, 9, 0, 0), 66, 45],
  [new Date(2020, 9, 18, 10, 0, 0), 54, 45],
  [new Date(2020, 9, 18, 11, 0, 0), 44, 45],
  [new Date(2020, 9, 18, 12, 0, 0), 77, 45],
  [new Date(2020, 9, 18, 13, 0, 0), 55, 45],
  [new Date(2020, 9, 18, 14, 0, 0), 38, 45],
  [new Date(2020, 9, 18, 15, 0, 0), 46, 45],
  [new Date(2020, 9, 18, 16, 0, 0), 75, 45],
  [new Date(2020, 9, 18, 17, 0, 0), 45, 45],
  [new Date(2020, 9, 18, 18, 0, 0), 55, 45],
  [new Date(2020, 9, 18, 19, 0, 0), 61, 45],
  [new Date(2020, 9, 18, 20, 0, 0), 49, 45],
  [new Date(2020, 9, 18, 21, 0, 0), 52, 45],
  [new Date(2020, 9, 18, 22, 0, 0), 35, 45],
  [new Date(2020, 9, 18, 23, 0, 0), 64, 45],
  [new Date(2020, 9, 18, 24, 0, 0), 22, 45],
];

const TodayEmissionChart: React.FC<TodayEmissionChartProps> = (): JSX.Element => {
  const descriptionDataset: DescriptionData[] = [
    {
      value: '2.5K t',
      description: '오늘 배출량'
    },
    {
      value: '45 t',
      description: '평균'
    }
  ];
  
  return (
    <>
      <CardTitle title="오늘 배출량"/>
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
              pattern: 'H시'
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

export default TodayEmissionChart;