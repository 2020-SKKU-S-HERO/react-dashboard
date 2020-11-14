import React from 'react';
import DataEmphasisCard from '../card/DataEmphasisCard';
import Card from '../card/Card';
import ThisYearEmissionChart from '../chart/ThisYearEmissionChart';
import TodayEmissionChart from '../chart/TodayEmissionChart';
import PastEmissionChart from '../chart/PastEmissionChart';
import PredictionEmissionChart from '../chart/PredictionEmissionChart';
import WeatherChart from '../chart/WeatherChart';
import ResourceContributionChart from '../chart/ResourceContributionChart';
import ContainerTitle from './ContainerTitle';
import { EmissionDataForLocation, EmissionDataState, useEmissionState } from '../context/EmissionContext';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MatchParams } from '../App';
import { abbreviateNumber } from '../script/common';

type EmissionWorkplaceProps = RouteComponentProps<MatchParams> & {};

const EmissionWorkplace: React.FC<EmissionWorkplaceProps> = ({ match }): JSX.Element => {
  const emissionState: EmissionDataState = useEmissionState();
  const { workplace } = match.params;
  let title: string = '';
  let thisYearEmission: number = 0;
  let expectedEmission: number = 0;
  
  emissionState.emissionData.emissionDataList.map((data: EmissionDataForLocation): void => {
    if (data.location.en === workplace) {
      title = `탄소배출량 - ${data.location.ko} 사업장`;
      thisYearEmission += data.thisYearEmission;
      expectedEmission += data.predictionEmission + data.thisYearEmission;
    }
  });
  
  return (
    <div className="container-fluid">
      <ContainerTitle title={title}/>
      <div className="row">
        <div className="col-12 col-sm-4">
          <div className="row">
            <div className="col-6">
              <DataEmphasisCard value={abbreviateNumber(thisYearEmission)} unit="t" description="현재 배출량" subDescription="2020년 1월 1일 - 현재" />
            </div>
            <div className="col-6">
              <DataEmphasisCard value={abbreviateNumber(expectedEmission)} unit="t" description="예상되는 배출량" subDescription="2020년" />
            </div>
            <div className="col-12">
              <Card>
                <ThisYearEmissionChart />
              </Card>
            </div>
            <div className="col-12">
              <Card>
                <ResourceContributionChart />
              </Card>
            </div>
            <div className="col-12">
              <Card>
                <WeatherChart />
              </Card>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-8">
          <div className="row">
            <div className="col-12">
              <Card>
                <TodayEmissionChart />
              </Card>
            </div>
            <div className="col-12">
              <Card>
                <PastEmissionChart />
              </Card>
            </div>
            <div className="col-12">
              <Card>
                <PredictionEmissionChart />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EmissionWorkplace);