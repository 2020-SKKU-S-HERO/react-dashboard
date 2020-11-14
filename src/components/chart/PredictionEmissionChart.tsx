import React from 'react';
import color from '../color/color';
import Chart from 'react-google-charts';
import CardTitle from '../card/CardTitle';
import CardDescription from '../card/CardDescription';
import { DescriptionData } from '../card/card-type';
import {
  EmissionDataForLocation,
  EmissionDataState,
  TimeSeriesData,
  useEmissionState
} from '../context/EmissionContext';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MatchParams } from '../App';

type PredictionEmissionChartProps = RouteComponentProps<MatchParams> & {};

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

const PredictionEmissionChart: React.FC<PredictionEmissionChartProps> = ({ match }): JSX.Element => {
  const emissionState: EmissionDataState = useEmissionState();
  const { workplace } = match.params;
  const now: Date = new Date();
  
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
  
  let chartData: any = [
    [
      'date',
      '배출량',
      '예측 배출량'
    ]
  ];
  
  for (let i = 0; i < 12; i++) {
    chartData.push([new Date(now.getFullYear(), i), 0, 0]);
  }
  
  emissionState.emissionData.emissionDataList.map((emissionData: EmissionDataForLocation): void => {
    if (workplace === undefined || workplace === emissionData.location.en) {
      emissionData.predictionEmissionTable.map((predictionEmissionData: TimeSeriesData): void => {
        const date: Date = new Date(predictionEmissionData.date);
    
        if (date.getFullYear() === now.getFullYear()) {
          chartData[date.getMonth() + 1][2] += predictionEmissionData.value;
        }
      });
  
      emissionData.pastEmissionTable.map((pastEmissionData: TimeSeriesData): void => {
        const date: Date = new Date(pastEmissionData.date);
    
        if (date.getFullYear() === now.getFullYear()) {
          chartData[date.getMonth() + 1][1] += pastEmissionData.value;
        }
      });
    }
  });
  
  // 0인 값 null 처리
  for (let i = 0; i < 12; i++) {
    if (chartData[i + 1][1] === 0) {
      chartData[i + 1][1] = null;
    }
    
    if (chartData[i + 1][2] === 0) {
      chartData[i + 1][2] = null;
    }
  }
  
  return (
    <>
      <CardTitle title="예측 배출량" />
      <Chart
        width={'100%'}
        height={'300px'}
        style={{ marginTop: 5 }}
        chartType="LineChart"
        options={options}
        data={chartData}
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

export default withRouter(PredictionEmissionChart);