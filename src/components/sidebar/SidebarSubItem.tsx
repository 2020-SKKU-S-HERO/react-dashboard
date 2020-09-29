import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import color from '../color/color';

type SidebarSubItemProps = {
  content: string;
  link: string;
};

const SidebarSubItemBlock = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  padding-left: 40px;
  cursor: pointer;
  align-items: center;
  color: ${color.font.default};
  
  &:hover {
    background-color: #E4E4F6;
  }
`;

const SidebarSubItem: React.FC<SidebarSubItemProps> = ({ content, link }): JSX.Element => {
  return (
    <Link to={link} style={{textDecoration: 'none'}}>
      <SidebarSubItemBlock>
        <span>{content}</span>
      </SidebarSubItemBlock>
    </Link>
  );
};

export default SidebarSubItem;