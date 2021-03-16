import React from "react";
import { Container, Row, Col, Label } from "nhsuk-react-components";
import qrCodeImage from "../img/QRCodeImage.svg";

export default function QrCode() {
  return (
    <div>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <Row>
              <Col width="two-thirds">
                <Label isPageHeading>QR Code</Label>
                <img id="nhs-qr-code" alt="login" src={qrCodeImage} />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
