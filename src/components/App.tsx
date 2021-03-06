import React from 'react';
import styled from 'styled-components';
import SidebarList from './sidebar/SidebarList';
import color from './color/color';
import EmissionHome from './page/EmissionHome';
import EmissionWorkplace from './page/EmissionWorkplace';
import { Switch, Route } from 'react-router-dom';
import EmissionProvider from './context/EmissionContext';
import CERPrice from './page/CERPrice';

export type MatchParams = {
  workplace: string;
}

const Container = styled.div`
  width: calc(100% - 250px);
  padding: 0 10px 0 10px;
`;

const AppBlock = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 110vh;
  background: ${color.gray.light};
  color: ${color.font.default};
`;

function App() {
  return (
    <EmissionProvider>
      <AppBlock>
        <SidebarList/>
        <Container>
          <Switch>
            <Route path="/emission/home" component={EmissionHome} />
            <Route path="/emission/:workplace" component={EmissionWorkplace} />
            <Route path="/cerprice" component={CERPrice} />
          </Switch>
        </Container>
      </AppBlock>
    </EmissionProvider>
  );
}

export default App;
