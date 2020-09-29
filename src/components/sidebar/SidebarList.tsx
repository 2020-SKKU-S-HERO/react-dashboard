import React from 'react';
import styled from 'styled-components';
import SidebarItem from './SidebarItem';
import SidebarSubItem from './SidebarSubItem';

type SidebarListProps = {};

const SidebarListBlock = styled.div`
  width: 250px;
  background-color: #FFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12),
              0 1px 2px rgba(0, 0, 0, .24);
`

const SidebarList: React.FC<SidebarListProps> = (): JSX.Element => {
  return (
    <SidebarListBlock>
      <SidebarItem icon="" content="탄소배출량" subItem>
        <SidebarSubItem content="종합" link="/emission/home"/>
        <SidebarSubItem content="병점" link="/emission/byeongjum"/>
        <SidebarSubItem content="수원" link="/emission/suwon"/>
        <SidebarSubItem content="인천" link="/emission/incheon"/>
      </SidebarItem>
      <SidebarItem icon="" content="탄소배출권"/>
      <SidebarItem icon="" content="데이터 입력"/>
    </SidebarListBlock>
  );
};

export default SidebarList;