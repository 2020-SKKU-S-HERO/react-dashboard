import React from 'react';
import styled from 'styled-components';


type CardProps = {};

const CardBlock = styled.div`
  background: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12),
              0 1px 2px rgba(0, 0, 0, .24);
  margin-bottom: 20px;
  border-radius: 3px;
`;

const Card: React.FC<CardProps> = ({ children }): JSX.Element => {
  return (
    <CardBlock>
      {children}
    </CardBlock>
  );
};

export default Card;