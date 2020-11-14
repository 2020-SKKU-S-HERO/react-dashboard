import React from 'react';
import CardTitle from '../card/CardTitle';
import Chart from 'react-google-charts';
import CardDescription from '../card/CardDescription';
import color from '../color/color';
import { DescriptionData } from '../card/card-type';

type CERPricePredictionChartProps = {};

const options = {
  vAxis: {
    format: 'short',
  },
  hAxis: {
    format: 'd일'
  },
  series: {
    0: {
      color: color.cyan.vivid
    },
    1: {
      color: color.violet.vivid
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
  focusTarget: 'category',
  fontName: 'Noto Sans KR',
  fontSize: 14
};

const CERPricePredictionChart: React.FC<CERPricePredictionChartProps> = (): JSX.Element => {
  const descriptionDataset: DescriptionData[] = [
    {
      value: '57,800 KRW',
      description: '예상되는 최저 가격'
    },
    {
      value: '11월 20일',
      description: '최저 가격 시기'
    }
  ];
  
  const data: any = [
    [
      { label: '날짜', type: 'date' },
      { label: '예측 가격', type: 'number' },
      { label: '실제 가격', type: 'number' }
    ],
    [new Date(2020, 11, 1), 60500, 60700],
    [new Date(2020, 11, 2), 60400, 60300],
    [new Date(2020, 11, 3), 59600, 59800],
    [new Date(2020, 11, 4), 59400, 59500],
    [new Date(2020, 11, 5), 59800, 59500],
    [new Date(2020, 11, 6), 60200, 59900],
    [new Date(2020, 11, 7), 60500, 60700],
    [new Date(2020, 11, 8), 60400, 60300],
    [new Date(2020, 11, 9), 59600, 59800],
    [new Date(2020, 11, 10), 59400, 59500],
    [new Date(2020, 11, 11), 59300, 59100],
    [new Date(2020, 11, 12), 60200, 59900],
    [new Date(2020, 11, 13), 60100, 60100],
    [new Date(2020, 11, 14), 58400, null],
    [new Date(2020, 11, 15), 58700, null],
    [new Date(2020, 11, 16), 58500, null],
    [new Date(2020, 11, 17), 58000, null],
    [new Date(2020, 11, 18), 57900, null],
    [new Date(2020, 11, 19), 58100, null],
    [new Date(2020, 11, 20), 57800, null],
    [new Date(2020, 11, 21), 58300, null],
    [new Date(2020, 11, 22), 58700, null],
    [new Date(2020, 11, 23), 58600, null],
    [new Date(2020, 11, 24), 58700, null],
    [new Date(2020, 11, 25), 58500, null],
    [new Date(2020, 11, 26), 58700, null],
    [new Date(2020, 11, 27), 59100, null],
    [new Date(2020, 11, 28), 59000, null],
    [new Date(2020, 11, 29), 58600, null],
    [new Date(2020, 11, 30), 58800, null]
  ];
  
  return (
    <>
      <CardTitle title="예측 배출권 가격"/>
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
              pattern: 'd일'
            }
          },
          {
            type: 'NumberFormat',
            column: 1,
            options: {
              suffix: ' KRW',
              fractionDigits: 0
            }
          },
          {
            type: 'NumberFormat',
            column: 2,
            options: {
              suffix: ' KRW',
              fractionDigits: 0
            }
          }
        ]}
      />
      <CardDescription dataset={descriptionDataset} />
    </>
  );
};

export default CERPricePredictionChart;