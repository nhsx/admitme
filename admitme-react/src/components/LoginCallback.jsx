import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, SummaryList, Container, Row, Col, Label } from "nhsuk-react-components";
import { appConfig } from "../config";

const summaryAppointment = (userData) => {
  let summary = [];
  Object.entries(userData).forEach(([key, value]) => {
    summary.push(
      <SummaryList.Row>
        <SummaryList.Key>{key}</SummaryList.Key>
        <SummaryList.Value>{value}</SummaryList.Value>
      </SummaryList.Row>
    );
  });
  return <SummaryList>{summary}</SummaryList>;
};

const generateQrCode = () => {
  // to be implemented
  window.location.href = '/qrcode'

}

export default function LoginCallback() {
  const [userInfo, setUserInfo] = useState({"loading": "loading"});

  const invokeToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      return alert("No code found in query");
    }
    const response = await axios.post(`/userinfo`, { code: code, redirectUri: appConfig.redirectUri });
    setUserInfo(response.data.result);
  };

  useEffect(() => {
    invokeToken();
  }, []);

  return (
    <div>
      <div className="nhsuk-width-container ">
        <main className="nhsuk-main-wrapper " id="maincontent" role="main">
          <Container>
            <Row>
              <Col width="two-thirds">
                <Label isPageHeading>Appointment details</Label>
                {summaryAppointment(userInfo)}
                <Button onClick={() => generateQrCode()}>Generate QR code</Button>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
