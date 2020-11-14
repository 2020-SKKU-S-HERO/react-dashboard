import React from 'react';
import ContainerTitle from './ContainerTitle';
import CurrentCERPriceChart from '../chart/CurrentCERPriceChart';
import Card from '../card/Card';
import CERPricePredictionChart from '../chart/CERPricePredictionChart';
import DataEmphasisCard from '../card/DataEmphasisCard';

type CERPriceProps = {};

const CERPrice: React.FC<CERPriceProps> = (): JSX.Element => {
  return (
    <>
      <div className="container-fluid">
        <ContainerTitle title="탄소배출권"/>
        <div className="row">
          <div className="col-12 col-sm-4">
            <div className="row">
              <div className="col-12">
                <Card>
                  <CurrentCERPriceChart />
                </Card>
              </div>
              <div className="col-6">
                <DataEmphasisCard value="12.1M" unit="t" description="예상 초과 배출량" subDescription="2020년"/>
              </div>
              <div className="col-6">
                <DataEmphasisCard value="57,800" unit="KRW" description="예상 최저 가격" subDescription="2020년"/>
              </div>
              <div className="col-6">
                <DataEmphasisCard value="693B" unit="KRW" description="예상 지출" subDescription="2020년"/>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-12">
                <Card>
                  <CERPricePredictionChart/>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CERPrice;