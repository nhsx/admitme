import React from "react";
import {
  Container,
  ErrorSummary,
  Label,
  BackLink,
} from "nhsuk-react-components";
import Loader from "react-loader-spinner";
import useUserInfo from "../api/useUserInfo";
import UserInfo from "../components/UserInfo";
import QrCode from "../components/QrCode";

export default function UserInfoPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const userInfo = useUserInfo(code);
  let contentToDispaly;

  // Loading data
  if (userInfo === "loading") {
    contentToDispaly = (
      <Loader
        className="loader"
        type="Oval"
        color="#007f3b"
        height={100}
        width={100}
      />
    );

    // error loading data
  } else if (userInfo === null || userInfo === undefined) {
    contentToDispaly = (
      <>
        <ErrorSummary
          aria-labelledby="error-summary-title"
          role="alert"
          tabIndex={-1}
        >
          <ErrorSummary.Title id="error-summary-title">
            There is a problem
          </ErrorSummary.Title>
          <ErrorSummary.Body>
            <p>
              There was an issue fetching your data. Please try again later.
            </p>
          </ErrorSummary.Body>
        </ErrorSummary>
      </>
    );

    // got user info
  } else {
    contentToDispaly = (
      <>
        <Label isPageHeading>Share your details</Label>
        <UserInfo userInfo={userInfo} />
        <br />
        <QrCode userInfo={userInfo} code={code} />
      </>
    );
  }

  return (
    <>
      <Container>
        <div className="nhsuk-width-container">
          <main className="nhsuk-main-wrapper" id="maincontent" role="main">
            <BackLink href="/">Back</BackLink>
            {contentToDispaly}
          </main>
        </div>
      </Container>
    </>
  );
}
