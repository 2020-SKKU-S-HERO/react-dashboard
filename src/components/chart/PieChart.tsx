import React from 'react';
import { Chart } from 'react-google-charts';
import color from '../color/color';

type PieChartProps = {
  data: any;
};

const options = {
  legend: {
    position: 'labeled',
    textStyle: {
      color: '#000'
    }
  },
  chartArea: {
    top: 10,
    bottom: 20,
    left: 20,
    right: 20
  },
  slices: {
    0: {
      color: color.violet.vivid
    },
    1: {
      color: color.cyan.vivid
    },
    2: {
      color: color.teal.vivid
    },
    4: {
      color: color.indigo.vivid
    }
  },
  fontName: 'Noto Sans KR',
  fontSize: 14,
  pieSliceText: 'none',
  pieHole: 0.38
};

const PieChart: React.FC<PieChartProps> = ({ data }): JSX.Element => {
  return (
    <>
      <Chart
        width={'100%'}
        height={'200px'}
        chartType={'PieChart'}
        data={data.sort((a: Array<any>, b: Array<any>): number => {
          console.log(a);
          return b[1] - a[1];
        })}
        options={options}
      />
    </>
  );
};

export default PieChart;