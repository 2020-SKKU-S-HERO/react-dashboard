import React from 'react';
import color from '../color/color';
import Chart from 'react-google-charts';
import CardTitle from '../card/CardTitle';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import CardDescription from '../card/CardDescription';
import { DescriptionData } from '../card/card-type';

type PastEmissionChartProps = {};

const options = {
  vAxis: {
    format: 'short',
    viewWindow: {
      min: 0
    }
  },
  hAxis: {
    format: 'd일'
    // viewWindow: {
    //   min: new Date(2020, 0, 0),
    //   max: new Date(2020, 0, 31)
    // }
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
    { label: '날짜', type: 'date' },
    { label: '배출량', type: 'number' },
    { label: '평균', type: 'number' }
  ],
  [new Date(2020, 0, 1), 1500, 3900],
  [new Date(2020, 0, 2), 3000, 3900],
  [new Date(2020, 0, 3), 1800, 3900],
  [new Date(2020, 0, 4), 2400, 3900],
  [new Date(2020, 0, 5), 3500, 3900],
  [new Date(2020, 0, 6), 3000, 3900],
  [new Date(2020, 0, 7), 5500, 3900],
  [new Date(2020, 0, 8), 2400, 3900],
  [new Date(2020, 0, 9), 7000, 3900],
  [new Date(2020, 0, 10), 1100, 3900],
  [new Date(2020, 0, 11), 2400, 3900],
  [new Date(2020, 0, 12), 4000, 3900],
  [new Date(2020, 0, 13), 3400, 3900],
  [new Date(2020, 0, 14), 2000, 3900],
  [new Date(2020, 0, 15), 7060, 3900],
  [new Date(2020, 0, 16), 6040, 3900],
  [new Date(2020, 0, 17), 6008, 3900],
  [new Date(2020, 0, 18), 5200, 3900],
  [new Date(2020, 0, 19), 4800, 3900],
  [new Date(2020, 0, 20), 6002, 3900],
  [new Date(2020, 0, 21), 5000, 3900],
  [new Date(2020, 0, 22), 2001, 3900],
  [new Date(2020, 0, 23), 105, 3900],
  [new Date(2020, 0, 24), 3400, 3900],
  [new Date(2020, 0, 25), 5005, 3900],
  [new Date(2020, 0, 26), 2004, 3900],
  [new Date(2020, 0, 27), 5005, 3900],
  [new Date(2020, 0, 28), 4700, 3900],
  [new Date(2020, 0, 29), 2000, 3900],
  [new Date(2020, 0, 30), 1004, 3900]
];

const monthlyDailyOptions = [
  {
    key: 'daily',
    text: '일간',
    value: 'daily'
  },
  {
    key: 'monthly',
    text: '월간',
    value: 'monthly'
  }
];

const dateOptions = [
  {
    key: '2020-04',
    text: '2020년 4월',
    value: '2020-04'
  },
  {
    key: '2020-03',
    text: '2020년 3월',
    value: '2020-03'
  },
  {
    key: '2020-02',
    text: '2020년 2월',
    value: '2020-02'
  },
  {
    key: '2020-01',
    text: '2020년 1월',
    value: '2020-01'
  }
];

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownBlock = styled.div`
  display: flex;
`;

const PastEmissionChart: React.FC<PastEmissionChartProps> = (): JSX.Element => {
  const descriptionDataset: DescriptionData[] = [
    {
      value: '124K t',
      description: '총 배출량'
    },
    {
      value: '3.9K t',
      description: '평균'
    }
  ];
  
  return (
    <>
      <TitleBlock>
        <CardTitle title="과거 배출량" />
        <DropdownBlock>
          <Dropdown
            style={{ width: 80, height: 30, marginRight: 20, marginTop: 3 }}
            fluid
            selection
            options={monthlyDailyOptions}
            defaultValue={monthlyDailyOptions[0].value}
          />
          <Dropdown
            style={{ width: 120, height: 30, marginRight: 20, marginTop: 3 }}
            fluid
            selection
            options={dateOptions}
            defaultValue={dateOptions[0].value}
          />
        </DropdownBlock>
      </TitleBlock>
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

export default PastEmissionChart;