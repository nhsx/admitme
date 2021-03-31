import React, { useState } from "react";
import { Container, Row, Col, Label, Button, SummaryList } from "nhsuk-react-components";

const getAuthCode = () => {
    window.location.href = '/';
};

const scanQR = () => {
    alert('Work in Progress!!')
};

const summaryAppointment = (userData) => {
    let summary = [];
    summary.push(
        <SummaryList.Row>
            <SummaryList.Key>Full Name</SummaryList.Key>
            <SummaryList.Value></SummaryList.Value>
        </SummaryList.Row>
    );
    summary.push(
        <SummaryList.Row>
            <SummaryList.Key>Date of Birth</SummaryList.Key>
            <SummaryList.Value></SummaryList.Value>
        </SummaryList.Row>
    );
    summary.push(
        <SummaryList.Row>
            <SummaryList.Key>NHS Number</SummaryList.Key>
            <SummaryList.Value></SummaryList.Value>
        </SummaryList.Row>
    );
    summary.push(
        <SummaryList.Row>
            <SummaryList.Key>Email address</SummaryList.Key>
            <SummaryList.Value></SummaryList.Value>
        </SummaryList.Row>
    );
    summary.push(
        <SummaryList.Row>
            <SummaryList.Key>Mobile Number</SummaryList.Key>
            <SummaryList.Value></SummaryList.Value>
        </SummaryList.Row>
    );
    return <SummaryList>{summary}</SummaryList>;
};

export default function QRScanPage() {
    const [userInfo, setUserInfo] = useState({ "loading": "loading" });
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("user");
    const labelstyle = { fontFamily: "Frutiger W01, Arial, Sans-serif", fontWeight: 'bold', fontSize: '16px' };

    return (
        <div className="nhsuk-width-container" >
            <Button style={{
                position: "absolute",
                right: '10px',
                top: '5px'
            }} onClick={() => getAuthCode()} > Logout</Button>

            <main className="nhsuk-main-wrapper" id="maincontent" role="main">
                <Container>
                    <Row>
                        <Col>
                            <Button onClick={() => scanQR()} > Scan</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col width="two-thirds">
                            <Label isPageHeading style={{ fontSize: '28px' }}>Welcome to NHSX  PAS</Label>
                            <p style={{
                                position: "absolute",
                                right: '50px',
                                top: '85px'
                            }} ><b> Logged in as, {code}</b></p>
                        </Col>
                    </Row>
                    <Row>

                        <Col>
                            <label style={labelstyle}>Full name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor:"darkgrey" }} disabled={true}/>
                            <br />
                            <br />

                            <label style={labelstyle}>Date of birth&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor: "darkgrey" }} disabled={true}/>
                            <br />
                            <br />

                            <label style={labelstyle}>NHS Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor:"darkgrey" }} disabled={true}/>
                            <br />
                            <br />

                            <label style={labelstyle}>Email address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor:"darkgrey" }} disabled={true}/>
                            <br />
                            <br />

                            <label style={labelstyle}><b>Mobile Number&nbsp;&nbsp;</b></label>
                            <input type="text" style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor:"darkgrey" }} disabled={true}/>
                            <br />
                            <br />
                            
                            <Button disabled={true}>Search</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col width="two-thirds">
                            <br/>
                            <Label isPageHeading style={{ fontSize: '28px' }}>Patient Profile </Label>
                        </Col>

                    </Row>

                </Container>
            </main>

        </div>
    );

};