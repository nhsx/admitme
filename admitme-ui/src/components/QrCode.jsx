import React from "react";
import { Container, Row, Col, Label, Button } from "nhsuk-react-components";
import qrCodeImage from "../img/QRCodeImage.svg";

import QRCode from "qrcode.react";//added by TRUPTI
import props from 'prop-types';//added by TRUPTI


const download = function () {
  const link = document.createElement("a");
  link.download = "filename.png";
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
};

const goback = () => {
  window.location.href = '/welcome'
}

export default function QrCode(props) {
  const code = props.location.state.code;
  alert(code);
  return (
    <div>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <Row>
              <Col width="two-thirds"><a class="navbar-item" onClick={() => goback()} >Back</a>
                <br />
                <br />
              </Col>
            </Row>
            <Row>
              <Col width="two-thirds">
                <Label isPageHeading>QR Code</Label>
                <QRCode value={code} id="canvas" size='256' />
                <br />
                <br />{/* 
                <Button onClick={download}>
                  Download QR
				        </Button> */}
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
