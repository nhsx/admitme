import React from "react";
import { Container, Row, Col, Label } from "nhsuk-react-components";
import QRCode from "qrcode.react"; //added by TRUPTI
import useWindowDimensions from "../utils/useWindowDimensions";

const goback = (paramcode) => {
  window.location.href = "/welcome?code=" + paramcode;
};

export default function QrCode(props) {
  const { windowHeight, windowWidth } = useWindowDimensions();
  const smallestSize = windowWidth < windowHeight ? windowWidth : windowHeight; // use the smallest window dimension to figure out how big the qr code should be to fit on screen
  const qrCodeSize = smallestSize < 730 ? smallestSize - 80 : 650; // max qr code size 650
  let code = "";
  let paramcode = "";

  if (typeof props.location.state != "undefined") {
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
                <a onClick={() => goback(paramcode)}>
                  <u>Back</u>
                </a>
                <br />
                <br />
              </Col>
            </Row>
            <Row>
              <Col width="two-thirds">
                <Label isPageHeading style={{ fontSize: "25px" }}>
                  Share your details with NHS staff
                </Label>
                <QRCode
                  style={{ margin: "0 auto", display: "block" }}
                  level="M"
                  value={JSON.stringify(code)}
                  id="canvas"
                  size={qrCodeSize}
                />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
