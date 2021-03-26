import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Header, Footer } from "nhsuk-react-components";

import AdmitMe from "./components/AdmitMe";
import LoginCallback from "./components/LoginCallback";
import QrCode from "./components/QrCode";
import QrScanner from "./components/QrScanner";
import Welcome from "./components/Welcome";

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
        <Route exact path="/logincallback" component={LoginCallback} />
        <Route exact path="/qrcode" component={QrCode} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/qrscanner" component={QrScanner} />

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
