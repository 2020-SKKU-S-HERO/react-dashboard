import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import color from '../color/color';

type DataEmphasisCardProps = {
  value: string;
  unit: string;
  description: string;
  subDescription: string;
};

const EmphasisCardBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  padding: 20px;
  border-radius: 3px;
  
  .value {
    color: ${color.violet.vivid};
    
    .number {
      font-weight: 500;
      font-size: 20px;
    }
    
    .unit {
      margin-left: 4px;
      font-weight: 500;
      font-size: 16px;
    }
  }
  
  .description {
    display: flex;
    flex-direction: column;
    
    .main-description {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    
    .sub-description {
      font-size: 13px;
      font-weight: 400;
      color: ${color.gray.vivid};
    }
  }
`;

const DataEmphasisCard: React.FC<DataEmphasisCardProps> = ({ value, unit, description, subDescription }): JSX.Element => {
  return (
    <>
      <Card>
        <EmphasisCardBlock>
          <div className="description">
            <span className="main-description">{description}</span>
            <span className="sub-description">{subDescription}</span>
          </div>
          <div className="value">
            <span className="number">{value}</span>
            <span className="unit">{unit}</span>
          </div>
        </EmphasisCardBlock>
      </Card>
    </>
  );
};

export default DataEmphasisCard;