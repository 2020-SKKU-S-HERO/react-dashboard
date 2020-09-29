import React from 'react';
import Card from '../card/Card';
import ThisYearEmissionChart from '../chart/ThisYearEmissionChart';
import WorkplaceContributionChart from '../chart/WorkplaceContributionChart';
import TodayEmissionChart from '../chart/TodayEmissionChart';
import PastEmissionChart from '../chart/PastEmissionChart';
import PredictionEmissionChart from '../chart/PredictionEmissionChart';
import DataEmphasisCard from '../card/DataEmphasisCard';
import ContainerTitle from './ContainerTitle';

type EmissionHomeProps = {};

const EmissionHome: React.FC<EmissionHomeProps> = (): JSX.Element => {
  return (
    <div className="container-fluid">
      <ContainerTitle title="탄소배출량 - 종합"/>
      <div className="row">
        <div className="col-12 col-sm-4">
          <div className="row">
            <div className="col-6">
              <DataEmphasisCard value="20K t" description="현재 배출량" subDescription="2020년 1월 1일 - 현재" />
            </div>
            <div className="col-6">
              <DataEmphasisCard value="60K t" description="예상되는 배출량" subDescription="2020년" />
            </div>
            <div className="col-6">
              <DataEmphasisCard value="30K t" description="허용 배출량" subDescription="2020년"/>
            </div>
            <div className="col-6">
              <DataEmphasisCard value="30K t" description="예상되는 초과량" subDescription="2020년"/>
            </div>
            <div className="col-12">
              <Card>
                <ThisYearEmissionChart />
              </Card>
            </div>
            <div className="col-12">
              <Card>
                <WorkplaceContributionChart />
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

export default EmissionHome;