import React, { Component, createRef, RefObject, useEffect, useState } from 'react';
import color from '../color/color';
import Chart from 'react-google-charts';
import CardTitle from '../card/CardTitle';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import styled from 'styled-components';
import CardDescription from '../card/CardDescription';
import { DescriptionData } from '../card/card-type';
import {
  EmissionDataForLocation,
  EmissionDataState,
  TimeSeriesData,
  useEmissionState
} from '../context/EmissionContext';

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

let dateOptions: any = [];

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownBlock = styled.div`
  display: flex;
`;

let hAxisDate: Date[] = [];

const PastEmissionChart: React.FC<PastEmissionChartProps> = (): JSX.Element => {
  const emissionState: EmissionDataState = useEmissionState();
  const rangeSelectorRef: RefObject<Component<DropdownProps, any, any>> = createRef();
  const dateSelectorRef: RefObject<Component<DropdownProps, any, any>> = createRef();
  let data: any = [
    [
      { label: '날짜', type: 'date' },
      { label: '배출량', type: 'number' },
      { label: '평균', type: 'number' }
    ]
  ];
  
  const now: Date = new Date();
  
  for (let i = 1; i <= now.getDate(); i++) {
    data.push([new Date(now.getFullYear(), now.getMonth(), i), 0, 0]);
  }
  
  hAxisDate.length = 0;
  
  for (let i = 1; i <= (new Date(now.getFullYear(), now.getMonth() + 1, 0)).getDate(); i++) {
    hAxisDate.push(new Date(now.getFullYear(), now.getMonth(), i));
  }
  
  const onChangeRangeSelectorEventListener = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
    let oldestDate: Date = new Date();
  
    console.log(data);
  
    emissionState.emissionData.emissionDataList.map((emissionData: EmissionDataForLocation): void => {
      emissionData.pastEmissionTable.map((timeSeriesData: TimeSeriesData): void => {
        const date: Date = new Date(timeSeriesData.date);
      
        if (date.valueOf() < oldestDate.valueOf()) {
          oldestDate = date;
        }
      });
    });
  
    dateOptions.length = 0;
    
    if (data.value === 'daily') {
      for (let date: Date = new Date(); date.getFullYear() > oldestDate.getFullYear() || date.getMonth() >= oldestDate.getMonth(); date.setMonth(date.getMonth() - 1)) {
        dateOptions.push({
          key: date.toISOString(),
          text: `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
          value: date.toISOString()
        });
      }

      if (dateSelectorRef.current) {
        dateSelectorRef.current.setState({
          value: dateOptions[0].value
        })
      }
    } else if (data.value === 'monthly') {
      for (let date: Date = new Date(); date.getFullYear() >= oldestDate.getFullYear(); date.setFullYear(date.getFullYear() - 1)) {
        dateOptions.push({
          key: date.toISOString(),
          text: `${date.getFullYear()}년`,
          value: date.toISOString()
        });
      }
  
      if (dateSelectorRef.current) {
        dateSelectorRef.current.setState({
          value: dateOptions[0].value
        })
      }
    }
  };
  
  const onChangeDateSelectorEventListener = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
    if (typeof data.value === 'string') {
      updateChart(new Date(data.value), rangeSelectorRef.current?.state.value);
    }
  };
  
  const updateChart = (selectedDate: Date, range: string) => {
    if (range === 'daily') {
      const dataTable: TimeSeriesData[] = [];
      
      emissionState.emissionData.emissionDataList.map((emissionData: EmissionDataForLocation): void => {
        emissionData.pastEmissionTable.map((timeSeriesData: TimeSeriesData): void => {
          const date: Date = new Date(timeSeriesData.date);
        
          if (selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth()) {
            dataTable.push(timeSeriesData);
          }
        });
      });
  
      console.log(dataTable);
      
      // for (let i = 1; i <= now.getDate(); i++) {
      //   data.push([new Date(now.getFullYear(), now.getMonth(), i), 0, 0]);
      // }
    
      hAxisDate.length = 0;
    
      for (let i = 1; i <= (new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)).getDate(); i++) {
        hAxisDate.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
      }
    }
  }
  
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
  
  useEffect((): void => {
    let oldestDate: Date = new Date();
  
    emissionState.emissionData.emissionDataList.map((emissionData: EmissionDataForLocation): void => {
      emissionData.pastEmissionTable.map((timeSeriesData: TimeSeriesData): void => {
        const date: Date = new Date(timeSeriesData.date);
      
        if (date.valueOf() < oldestDate.valueOf()) {
          oldestDate = date;
        }
      });
    });
  
    dateOptions.length = 0;
  
    for (let date: Date = new Date(); date.getFullYear() > oldestDate.getFullYear() || date.getMonth() >= oldestDate.getMonth(); date.setMonth(date.getMonth() - 1)) {
      dateOptions.push({
        key: date.toISOString(),
        text: `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
        value: date.toISOString()
      });
    }
  
    if (dateSelectorRef.current) {
      dateSelectorRef.current.setState({
        value: dateOptions[0].value
      })
    }
  }, [emissionState.emissionData.emissionDataList, dateSelectorRef]);
  
  return (
    <>
      <TitleBlock>
        <CardTitle title="과거 배출량" />
        <DropdownBlock>
          <Dropdown
            style={{ width: 80, height: 30, marginRight: 20, marginTop: 3 }}
            fluid
            selection
            onChange={onChangeRangeSelectorEventListener}
            options={monthlyDailyOptions}
            defaultValue={monthlyDailyOptions[0].value}
            ref={rangeSelectorRef}
          />
          <Dropdown
            style={{ width: 130, height: 30, marginRight: 20, marginTop: 3 }}
            fluid
            selection
            onChange={onChangeDateSelectorEventListener}
            options={dateOptions}
            ref={dateSelectorRef}
          />
        </DropdownBlock>
      </TitleBlock>
      <Chart
        width={'100%'}
        height={'300px'}
        style={{marginTop: 5}}
        chartType="LineChart"
        options={{
          ...options,
          hAxis: {
            ticks: hAxisDate,
            format: 'd일'
          }
        }}
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