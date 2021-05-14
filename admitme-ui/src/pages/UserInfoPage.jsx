import React from "react";
import { Container, Row, Col, Label, BodyText } from "nhsuk-react-components";
import useUserInfo from "../api/useUserInfo";
import UserInfo from "../components/UserInfo";
import GenerateQRCodeButton from "../components/GenerateQRCodeButton";
import Loader from "react-loader-spinner";

export default function UserInfoPage(props) {
  const code = props.location.state.code;
  const userInfo = useUserInfo(code);
  let dataToDispaly;
  console.log("user:", userInfo);

  // Loading data
  if (userInfo === "loading") {
    console.log("HERE!!");
    dataToDispaly = (
      <Loader
        className="loader"
        type="Oval"
        color="#005eb8"
        height={200}
        width={200}
      />
    );

    // error loading data
  } else if (userInfo === null || userInfo === undefined) {
    dataToDispaly = <div>error</div>;

    // got user info
  } else {
    console.log("got user!!");
    console.log(userInfo);
    dataToDispaly = <UserInfo userInfo={userInfo} />;
  }

  return (
    <>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <Row>
              <Col width="two-thirds">
                <a>
                  <u>Back</u>
                </a>
                <br />
                <br />
              </Col>
            </Row>
            <Row>
              <Col width="two-thirds">
                <Label isPageHeading style={{ fontSize: "28px" }}>
                  Your contact details
                </Label>
                <BodyText>
                  Please check the details below are correct and press Generate
                  QR code when you are ready for them to scan your device.
                </BodyText>
                {dataToDispaly}
                <div className="vertical-center">
                  <GenerateQRCodeButton userInfo={userInfo} code={code} />
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </>
  );
}
