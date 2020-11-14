import React from 'react';
import Chart from 'react-google-charts';
import color from '../color/color';
import CardTitle from '../card/CardTitle';
import { EmissionDataForLocation, EmissionDataState, useEmissionState } from '../context/EmissionContext';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MatchParams } from '../App';

type ThisYearEmissionChartProps = RouteComponentProps<MatchParams> & {};

const options = {
  vAxis: {
    format: 'short',
    textStyle: {
      fontName: 'Noto Sans KR',
      fontSize: 14
    },
    viewWindow: {
      min: 0
    }
  },
  seriesType: 'bars',
  series: {
    0: {
      color: color.violet.vivid
    },
    1: {
      color: color.cyan.vivid
    },
    2: {
      type: 'steppedArea',
      color: color.teal.vivid,
      areaOpacity: 0,
      lineDashStyle: [4, 8],
      enableInteractivity: false
    }
  },
  legend: {
    position: 'top',
    alignment: 'end',
    textStyle: {
      fontName: 'Noto Sans KR',
      fontSize: 15
    }
  },
  chartArea: {
    top: 20,
    bottom: 40,
    left: 58,
    right: 25
  },
  focusTarget: 'category',
  tooltip: {
    textStyle: {
      fontName: 'Noto Sans KR',
      fontSize: 14
    }
  },
  bar: {
    groupWidth: '20%'
  }
};

const ThisYearEmissionChart: React.FC<ThisYearEmissionChartProps> = ({ match }): JSX.Element => {
  const emissionState: EmissionDataState = useEmissionState();
  const { workplace } = match.params;
  let permissibleEmission: number | null = emissionState.emissionData.permissibleEmission;
  let thisYearEmission: number = 0;
  let expectedEmission: number = 0;
  
  emissionState.emissionData.emissionDataList.map((data: EmissionDataForLocation): void => {
    if (workplace === undefined || workplace === data.location.en) {
      thisYearEmission += data.thisYearEmission;
      expectedEmission += data.predictionEmission + data.thisYearEmission;
    }
  });
  
  let data: any = [
    [
      { label: '', type: 'string' },
      { label: '현재', type: 'number' },
      { label: '예상', type: 'number' },
      { label: '허용', type: 'number' }
    ],
    ['', thisYearEmission, expectedEmission, permissibleEmission]
  ];
  
  if (workplace !== undefined) {
    data[0].pop(3);
    data[1].pop(3);
  }
  
  return (
    <>
      <CardTitle title="올해 배출량 개요"/>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="ComboChart"
        options={options}
        data={data}
        formatters={[
          {
            type: 'NumberFormat',
            column: 1,
            options: {
              suffix: 't',
              fractionDigits: 0
            }
          },
          {
            type: 'NumberFormat',
            column: 2,
            options: {
              suffix: 't',
              fractionDigits: 0
            }
          },
          {
            type: 'NumberFormat',
            column: 3,
            options: {
              suffix: 't',
              fractionDigits: 0
            }
          }
        ]}
      />
    </>
  );
};

export default withRouter(ThisYearEmissionChart);