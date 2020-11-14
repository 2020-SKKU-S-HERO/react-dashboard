import React from 'react';
import CardTitle from '../card/CardTitle';
import { Chart } from 'react-google-charts';
import color from '../color/color';
import styled from 'styled-components';

type CurrentCERPriceChartProps = {};

const options = {
  vAxis: {
    viewWindow: {
    }
  },
  hAxis: {
    format: 'd일',
    ticks: [
      new Date(2020, 10, 7),
      new Date(2020, 10, 8),
      new Date(2020, 10, 9),
      new Date(2020, 10, 10),
      new Date(2020, 10, 11),
      new Date(2020, 10, 12),
      new Date(2020, 10, 13)
    ]
  },
  series: {
    0: {
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
    left: 75,
    right: 25
  },
  focusTarget: 'category',
  fontName: 'Noto Sans KR',
  fontSize: 14,
  tooltip: {
    showColorCode: false
  }
};

const PriceInfoBlock = styled.div`
  padding: 0 20px 20px 20px;
  
  .number {
    font-size: 24px;
    font-weight: 500;
    color: ${color.violet.vivid}
  }
  
  .unit {
    margin-left: 5px;
    font-size: 16px;
    color: ${color.gray.vivid}
  }
  
  .change {
    margin-left: 5px;
    font-size: 16px;
  }
  
  .change--increase {
    color: ${color.red.vivid}
  }
  
  .change--decrease {
    color: ${color.blue.vivid}
  }
`;

const CurrentCERPriceChart: React.FC<CurrentCERPriceChartProps> = (): JSX.Element => {
  const data: any = [
    [
      { label: '날짜', type: 'date' },
      { label: '가격', type: 'number' },
      { label: '평균', type: 'number' }
    ],
    [new Date(2020, 10, 7), 60700, 60000],
    [new Date(2020, 10, 8), 60300, 60000],
    [new Date(2020, 10, 9), 59800, 60000],
    [new Date(2020, 10, 10), 59500, 60000],
    [new Date(2020, 10, 11), 59100, 60000],
    [new Date(2020, 10, 12), 59900, 60000],
    [new Date(2020, 10, 13), 60100, 60000],
  ]
  
  return (
    <>
      <CardTitle title="현재 배출권 가격"/>
      <PriceInfoBlock>
        <span className="number">60,100</span>
        <span className="unit"> KRW</span>
        <span className="change change--increase">+200 (0.33%)</span>
      </PriceInfoBlock>
      <Chart
        width={'100%'}
        height={'300px'}
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
    </>
  );
};

export default CurrentCERPriceChart;