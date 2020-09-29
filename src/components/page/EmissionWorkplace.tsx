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

type EmissionWorkplaceProps = {};

const EmissionWorkplace: React.FC<EmissionWorkplaceProps> = (): JSX.Element => {
  return (
    <div className="container-fluid">
      <ContainerTitle title="탄소배출량 - 병점 사업장"/>
      <div className="row">
        <div className="col-12 col-sm-4">
          <div className="row">
            <div className="col-6">
              <DataEmphasisCard value="20K t" description="현재 배출량" subDescription="2020년 1월 1일 - 현재" />
            </div>
            <div className="col-6">
              <DataEmphasisCard value="60K t" description="예상되는 배출량" subDescription="2020년" />
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

export default EmissionWorkplace;