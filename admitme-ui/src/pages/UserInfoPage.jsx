import React from "react";
import { Container, Row, Col, Label, BodyText } from "nhsuk-react-components";
import useUserInfo from "../api/useUserInfo";
import UserInfo from "../components/UserInfo";
import GenerateQRCodeButton from "../components/GenerateQRCodeButton";

export default function UserInfoPage(props) {
  const code = props.location.state.code;
  const userInfo = useUserInfo(code);
  let dataToDispaly;
  console.log("user:", userInfo);

  // Loading data
  if (userInfo === "loading") {
    console.log("HERE!!");
    dataToDispaly = <div>loading</div>;

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
      <div className="nhsuk-width-container ">
        <main className="nhsuk-main-wrapper " id="maincontent" role="main">
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
                  Share your details with NHS staff
                </Label>
                <BodyText>
                  If you are arriving for an appointment, you can transfer your
                  personal details securely to certain members of NHS staff.
                </BodyText>
                <BodyText>
                  Please check the details below are correct and press Generate
                  QR code when you are ready for them to scan your device.
                </BodyText>
                {dataToDispaly}
                <GenerateQRCodeButton userInfo={userInfo} code={code} />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </>
  );
}
