import React from 'react';
import styled from 'styled-components';

type CardTitleProps = {
  title: string
};

const TitleBlock = styled.div`
  display: inline-block;
  padding: 20px;
  font-size: 16px;
`;

const CardTitle: React.FC<CardTitleProps> = ({ title }): JSX.Element => {
  return (
    <TitleBlock>
      <span>{title}</span>
    </TitleBlock>
  );
};

export default CardTitle;