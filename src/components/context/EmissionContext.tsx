import React, { createContext, Dispatch, useCallback, useContext, useEffect, useReducer } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

type EmissionContextProps = {};

export type TimeSeriesData = {
  date: string;
  value: number;
};

export type EmissionDataForLocation = {
  location: { ko: string; en: string; };
  thisYearEmission: number;
  predictionEmission: number;
  todayEmissionTable: TimeSeriesData[];
  pastEmissionTable: TimeSeriesData[];
  predictionEmissionTable: TimeSeriesData[];
};

export type EmissionData = {
  emissionDataList: EmissionDataForLocation[];
  permissibleEmission: number;
};

export type EmissionDataState = {
  emissionData: EmissionData;
  isLoading: boolean;
  error: AxiosError | null;
};

type Action =
  { type: 'LOADING' }
  | { type: 'UPDATE', data: EmissionData }
  | { type: 'ERROR', error: AxiosError };


const initialState: EmissionDataState = {
  emissionData: {
    emissionDataList: [],
    permissibleEmission: 0
  },
  isLoading: false,
  error: null
};

function emissionReducer(state: EmissionDataState, action: Action): EmissionDataState {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case 'UPDATE':
      return {
        emissionData: action.data,
        isLoading: false,
        error: null
      };
    
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
  }
}

function useAsync(callback: (() => Promise<EmissionData>), deps: [] = [], skip: boolean = false): [EmissionDataState, () => Promise<void>] {
  const [state, dispatch] = useReducer(emissionReducer, initialState);
  
  const fetchData = useCallback(async (): Promise<void> => {
    dispatch({ type: 'LOADING' });
    try {
      const data: EmissionData = await callback();
      dispatch({ type: 'UPDATE', data: data });
      console.log('dispatch!');
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }, [callback]);
  
  useEffect((): void => {
    if (skip) {
      return;
    }
    fetchData();
    setInterval((): void => {
      fetchData();
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  
  return [state, fetchData];
}

async function getEmissionData(): Promise<EmissionData> {
  const response: AxiosResponse<EmissionData> = await axios.get('http://localhost:5000/api/emission');
  
  return response.data;
}

const EmissionStateContext = createContext<EmissionDataState>(initialState);

const EmissionProvider: React.FC<EmissionContextProps> = ({ children }): JSX.Element => {
  const [state, refetch] = useAsync(getEmissionData);
  
  return (
    <EmissionStateContext.Provider value={state}>
      {children}
    </EmissionStateContext.Provider>
  );
};

export default EmissionProvider;

export function useEmissionState(): EmissionDataState {
  const state = useContext<EmissionDataState>(EmissionStateContext);
  
  if (!state) {
    throw new Error('Cannot find state');
  }
  
  return state;
}