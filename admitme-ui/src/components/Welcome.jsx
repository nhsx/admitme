import React from "react";
import { Container, Row, Col, Label, LedeText, BodyText } from "nhsuk-react-components";

import { appConfig } from "../config";
import { uriBuilder } from "../utils/util";
import { Link, useLocation } from "react-router-dom";

import loginButton from "../img/LogInWith_Original.svg";

export default function AdmitMe() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    return (

        <div>
            <div className="nhsuk-width-container">
                <main className="nhsuk-main-wrapper" id="maincontent" role="main">
                    <Container>
                        <Row>
                            <Col width="two-thirds">
                                <Label isPageHeading>Welcome to Admit Me POC</Label>
                                <BodyText>Please click button below to continue</BodyText>
                                
                                <Link  className='nhsuk-link' to={{
                                    pathname: '/logincallback',
                                    state: {code}
                                }}> Admit Me </Link>
                            </Col>
                        </Row>
                    </Container>
                </main>
            </div>
        </div>
    );
}