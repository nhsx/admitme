import React from "react";
import { Container, Row, Col, Label, LedeText, BodyText } from "nhsuk-react-components";
import { appConfig } from "../config";
import { uriBuilder } from "../utils/util";
import loginButton from "../img/LogInWith_Original.svg";

const getAuthCode = () => {
  const redirectLink = uriBuilder(appConfig.nhsRootDomain + "/authorize", [
    { key: "client_id", value: appConfig.clientId },
    { key: "scope", value: appConfig.scope },
    { key: "response_type", value: appConfig.responseType },
    { key: "redirect_uri", value: appConfig.redirectUri },
  ]);
  window.location.href = redirectLink;
};

export default function AdmitMe() {
  sessionStorage.clear();
  return (
    <div>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <Row>
              <Col width="two-thirds">
                <Label isPageHeading>Admit Me</Label>
                <LedeText>A proof of concept QR code generation feature on your NHS app.</LedeText>
                <BodyText>Generate QR code to automatically transfer patient demographic data from the NHS app to clinical systems.</BodyText>
                <button id="log-in-button" onClick={() => getAuthCode()}>
                  <img id="nhs-login-img" alt="login" src={loginButton} />
                </button>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
