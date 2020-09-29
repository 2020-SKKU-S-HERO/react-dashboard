import React from 'react';
import styled from 'styled-components';
import color from '../color/color';

type ContainerTitleProps = {
  title: string;
};

const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  font-size: 26px;
  font-weight: 500;
  color: ${color.gray.vivid};
  padding: 20px 0;
`;

const ContainerTitle: React.FC<ContainerTitleProps> = ({ title }): JSX.Element => {
  return (
    <TitleBlock>
      <span>{title}</span>
    </TitleBlock>
  );
};

export default ContainerTitle;