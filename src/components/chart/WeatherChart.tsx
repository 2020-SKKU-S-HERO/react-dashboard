import React from 'react';
import CardTitle from '../card/CardTitle';
import Chart from 'react-google-charts';
import color from '../color/color';
import styled from 'styled-components';
import humidityIcon from '../../images/icon/ic-humidity.svg';
import cloudyIcon from '../../images/icon/ic-cloudy.svg';

type WeatherChartProps = {};

const options = {
  vAxes: [
    {
      format: '#.#°',
      viewWindow: {
        max: 40,
        min: -40
      },
      ticks: [-40, -20, 0, 20, 40]
    },
    {
      format: 'percent',
      viewWindow: {
        max: 1,
        min: 0
      },
      ticks: [0, 0.25, 0.5, 0.75, 1]
    }
  ],
  hAxis: {
    format: 'H시',
    gridlines: {
      count: 5
    }
  },
  series: {
    0: {
      curveType: 'function',
      color: color.violet.vivid,
      targetAxisIndex: 0
    },
    1: {
      curveType: 'function',
      color: color.cyan.vivid,
      targetAxisIndex: 1
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
    right: 65
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
    '온도',
    '습도'
  ],
  [new Date(2020, 9, 17, 21, 0, 0), 17.2, 0.3],
  [new Date(2020, 9, 18, 0, 0, 0), 18.2, 0.4],
  [new Date(2020, 9, 18, 3, 0, 0), 18.5, 0.4],
  [new Date(2020, 9, 18, 6, 0, 0), 20.8, 0.3],
  [new Date(2020, 9, 18, 9, 0, 0), 24.1, 0.3],
  [new Date(2020, 9, 18, 12, 0, 0), 27.7, 0.2]
];

const WeatherSummaryBlock = styled.div`
  display: flex;
  justify-content: left;
  height: 100px;
  padding: 0 0 20px 20px;
  
  .weather {
    display: flex;
    align-items: center;
    margin-right: 15px;
    
    img {
     height: 60px;
    }
  }
  
  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
  
    .temp {
      font-size: 34px;
      font-weight: 600;
      margin-right: 10px;
    }
    
    .humidity {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      color: ${color.gray.vivid};
    }
  }
`;

const WeatherChart: React.FC<WeatherChartProps> = (): JSX.Element => {
  return (
    <>
      <CardTitle title="날씨" />
      <WeatherSummaryBlock>
        <div className="weather">
          <img src={cloudyIcon} />
        </div>
        <div className="description">
          <div className="temp">27.7°</div>
          <div className="humidity">습도: 20%</div>
        </div>
      </WeatherSummaryBlock>
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
              pattern: 'H시'
            }
          },
          {
            type: 'NumberFormat',
            column: 1,
            options: {
              suffix: '°',
              fractionDigits: 1
            }
          },
          {
            type: 'NumberFormat',
            column: 2,
            options: {
              pattern: '#,###%',
              fractionDigits: 0
            }
          }
        ]}
      />
    </>
  );
};

export default WeatherChart;