import React from 'react';
import Chart from 'react-google-charts';
import color from '../color/color';
import CardTitle from '../card/CardTitle';
import CardDescription from '../card/CardDescription';
import { DescriptionData } from '../card/card-type';
import {
  EmissionDataForLocation,
  EmissionDataState,
  TimeSeriesData,
  useEmissionState
} from '../context/EmissionContext';
import { abbreviateNumber } from '../script/common';
import { MatchParams } from '../App';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type TodayEmissionChartProps = RouteComponentProps<MatchParams> & {};

const options = {
  vAxis: {
    format: 'short',
    viewWindow: {
      min: 0
    }
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

const TodayEmissionChart: React.FC<TodayEmissionChartProps> = ({ match }): JSX.Element => {
  const emissionState: EmissionDataState = useEmissionState();
  const { workplace } = match.params;
  const now: Date = new Date();
  let data: any = [
    [
      'date',
      '배출량',
      '평균'
    ]
  ];
  
  for (let i = 0; i <= now.getHours(); i++) {
    data.push([new Date(now.getFullYear(), now.getMonth(), now.getDate(), i, 0, 0), 0, 0]);
  }
  
  emissionState.emissionData.emissionDataList.map((emissionData: EmissionDataForLocation): void => {
    if (workplace === undefined || workplace === emissionData.location.en) {
      emissionData.todayEmissionTable.map((timeSeriesData: TimeSeriesData): void => {
        const date: Date = new Date(timeSeriesData.date);
    
        data[date.getHours() + 1][1] += timeSeriesData.value;
      });
    }
  });
  
  let totalEmission: number = 0;
  let averageEmissionPerHours: number = 0;
  
  data.map((value: any): void => {
    if (value[0] instanceof Date) {
      totalEmission += value[1];
    }
  });
  
  averageEmissionPerHours = totalEmission / (now.getHours() + 1);
  
  data.map((value: any): void => {
    if (value[0] instanceof Date) {
      value[2] = averageEmissionPerHours;
    }
  });
  
  const descriptionDataset: DescriptionData[] = [
    {
      value: abbreviateNumber(totalEmission) + ' t',
      description: '오늘 배출량'
    },
    {
      value: abbreviateNumber(averageEmissionPerHours) + ' t',
      description: '평균'
    }
  ];
  
  let hAxisTime: Date[] = [];
  
  for (let fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); fromDate < now; fromDate.setHours(fromDate.getHours() + 1)) {
    hAxisTime.push(new Date(fromDate));
  }
  
  return (
    <>
      <CardTitle title="오늘 배출량" />
      <Chart
        width={'100%'}
        height={'300px'}
        style={{ marginTop: 5 }}
        chartType="LineChart"
        options={{
          ...options,
          hAxis: {
            ticks: hAxisTime,
            format: 'H시'
          }
        }}
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

export default withRouter(TodayEmissionChart);