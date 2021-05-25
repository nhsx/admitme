import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Header, Footer } from "nhsuk-react-components";

import AdmitMe from "./pages/AdmitMe";
import UserInfoPage from "./pages/UserInfoPage";

function App() {
  return (
    <BrowserRouter>
      <Header transactional>
        <Header.Container>
          <Header.Logo href="/" />
          <Header.ServiceName href="/">Admit Me</Header.ServiceName>
        </Header.Container>
      </Header>
      <Switch>
        <Route exact path="/" component={AdmitMe} />
        <Route exact path="/logincallback" component={UserInfoPage} />
      </Switch>
      <Footer>
        <Footer.List>
          <Footer.ListItem href="/">Admit Me</Footer.ListItem>
        </Footer.List>
        <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
      </Footer>
    </BrowserRouter>
  );
}

export default App;
