import React from 'react';
import styled from 'styled-components';
import color from '../color/color';
import { DescriptionData } from './card-type';

type CardDescriptionProps = {
  dataset: DescriptionData[];
};

const CardDescriptionBlock = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-top: 1px solid rgba(220, 224, 228);
`;

const DescriptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .value {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .description {
    font-size: 14px;
    color: ${color.gray.vivid}
  }
`;

const CardDescription: React.FC<CardDescriptionProps> = ({ dataset }): JSX.Element => {
  return (
    <CardDescriptionBlock>
      {dataset.map((data: DescriptionData) => (
        <DescriptionBlock>
          <div className="value">
            {data.icon && <img src={data.icon} />}
            <span>{data.value}</span>
          </div>
          <div className="description">{data.description}</div>
        </DescriptionBlock>
      ))}
    </CardDescriptionBlock>
  );
};

export default CardDescription;