import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header, Footer } from "nhsuk-react-components";
import Loginpage from "./components/Loginpage";
import QRScanPage from "./components/QRScanPage"

function App() {
  return (
    <BrowserRouter>
      <Header transactional>
        <Header.Container>
          <Header.Logo href="/" />
          <Header.ServiceName href="/">NHSX PAS</Header.ServiceName>
        </Header.Container>
      </Header>
      <Switch>
        <Route exact path='/' component={Loginpage} />
        <Route exact path='/:ScanQR' component={QRScanPage} />        

      </Switch>
      <Footer>
        <Footer.List>
          <Footer.ListItem href="/">NHSX PAS</Footer.ListItem>
        </Footer.List>
        <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
      </Footer>
    </BrowserRouter>
  );
}

export default App;

