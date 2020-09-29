import React from 'react';

type EmissionContextProps = {};

export type TimeSeriesData = {
  date: string;
  value: number;
};

type EmissionDataForLocation = {
  location: { ko: string; en: string; };
  thisYearEmission: number;
  predictionEmission: number;
  todayEmissionTable: TimeSeriesData[];
  pastEmissionTable: TimeSeriesData[];
  predictionEmissionTable: TimeSeriesData[];
};

type EmissionData = {
  emissionDataList: EmissionDataForLocation[];
  permissibleEmission: number;
};

type Action =
  { type: 'CREATE', data: EmissionDataForLocation }
  | { type: 'CHANGE_PERMISSIBLE_EMISSION', permissibleEmission: number }
  | { type: 'UPDATE', data: EmissionData }
  

const initialState: EmissionData = {
  emissionDataList: [],
  permissibleEmission: 0
};

function emissionReducer(state: EmissionData, action: Action): EmissionData {
  switch (action.type) {
    case 'CHANGE_PERMISSIBLE_EMISSION':
      return {
        ...state,
        permissibleEmission: state.permissibleEmission
      };
  
    case 'UPDATE':
      return action.data;
  }
}

const EmissionContext: React.FC<EmissionContextProps> = (): JSX.Element => {
  return (
    <>
      
    </>
  );
};

export default EmissionContext;