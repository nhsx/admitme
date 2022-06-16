import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route exact path='/' element={<Loginpage />} />
        <Route exact path='/:ScanQR' element={<QRScanPage />} />
      </Routes>
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

