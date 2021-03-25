import React from "react";
import { Container, Row, Col, Label, Button } from "nhsuk-react-components";
import qrCodeImage from "../img/QRCodeImage.svg";
import { Link, useLocation } from "react-router-dom";
import QRCode from "qrcode.react";//added by TRUPTI
import props from 'prop-types';//added by TRUPTI

const goback = (paramcode) => {
  window.location.href = '/welcome?code=' + paramcode
}

export default function QrCode(props) {
  let code = '';
  let paramcode = '';
  if (typeof props.location.state != 'undefined') {
    code = props.location.state.code;
    paramcode = props.location.state.paramcode;
  }
  return (
    <div>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <Row>
              <Col width="two-thirds">
                <a onClick={() => goback(paramcode)} ><u>Back</u></a>
                <br />
                <br />
              </Col>
            </Row>
            <Row>
              <Col width="two-thirds">
                <Label isPageHeading>QR Code</Label>
                <QRCode value={code} id="canvas" size={300} />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
