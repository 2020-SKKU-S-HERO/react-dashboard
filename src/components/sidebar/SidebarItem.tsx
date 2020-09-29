import React from 'react';
import styled from 'styled-components';
import icArrow from '../../images/icon/ic-arrow.svg';
import { Link } from 'react-router-dom';
import color from '../color/color';

type SidebarItemProps = {
  icon: string;
  content: string;
  link?: string;
  subItem?: boolean;
};

const SidebarItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentBlock = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  cursor: pointer;
  align-items: center;
  font-size: 16px;
  color: ${color.font.default};
  text-decoration: none;
  
  .arrow {
    height: 10px;
    margin-left: auto;
  }
  
  &:hover {
    background-color: #E4E4F6;
  }
`

const SubItemBlock = styled.div`
  font-size: 14px;
`

const SidebarItem: React.FC<SidebarItemProps> = ({ children, icon, content, link, subItem }): JSX.Element => {
  if (link) {
    return (
      <SidebarItemBlock>
        <Link to={link} style={{textDecoration: 'none'}}>
          <ContentBlock>
            <img src={icon} />
            <span>{content}</span>
            {subItem && <img className="arrow" src={icArrow} />}
          </ContentBlock>
        </Link>
        {subItem &&
        <SubItemBlock>
          {children}
        </SubItemBlock>}
      </SidebarItemBlock>
    );
  } else {
    return (
      <SidebarItemBlock>
        <ContentBlock>
          <img src={icon} />
          <span>{content}</span>
          {subItem && <img className="arrow" src={icArrow} />}
        </ContentBlock>
        {subItem &&
        <SubItemBlock>
          {children}
        </SubItemBlock>}
      </SidebarItemBlock>
    );
  }
};

export default SidebarItem;