import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import color from '../color/color';

type DataEmphasisCardProps = {
  value: string;
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
    font-size: 22px;
    font-weight: 600;
  }
  
  .description {
    display: flex;
    flex-direction: column;
    
    .main-description {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    
    .sub-description {
      font-size: 14px;
      font-weight: 400;
      color: ${color.gray.vivid};
    }
  }
`;

const DataEmphasisCard: React.FC<DataEmphasisCardProps> = ({ value, description, subDescription }): JSX.Element => {
  return (
    <>
      <Card>
        <EmphasisCardBlock>
          <div className="description">
            <span className="main-description">{description}</span>
            <span className="sub-description">{subDescription}</span>
          </div>
          <div className="value">
            {value}
          </div>
        </EmphasisCardBlock>
      </Card>
    </>
  );
};

export default DataEmphasisCard;