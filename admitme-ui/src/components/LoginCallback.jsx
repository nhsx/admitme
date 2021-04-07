import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, SummaryList, Container, Row, Col, Label, LedeText, BodyText } from "nhsuk-react-components";
import { appConfig } from "../config";
import { Link } from "react-router-dom";
import props from 'prop-types';
import Moment from 'moment';

const fhir = require('../utils/fhir.json');

const goback = (paramcode) => {
  window.location.href = '/welcome?code=' + paramcode
}

const summaryAppointment = (userData) => {
  console.log(JSON.stringify(userData));
  let fullname = '';
  let dob = '';
  let nhs_number = '';
  if (typeof userData.given_name != 'undefined') {
    let summary = [];
    fullname = userData.given_name + " " + userData.family_name;
    if (typeof userData.birthdate != 'undefined') {
      dob = Moment(userData.birthdate).format('DD/MM/YYYY');
    }
    if (typeof userData.nhs_number != 'undefined') {
      nhs_number = userData.nhs_number;
      nhs_number = nhs_number.substring(0, 3) + " " + nhs_number.substring(3, 6) + " " + nhs_number.substring(6, 11);
    }
    let email = userData.email;
    let mobile_number = userData.phone_number;

    summary.push(
      <SummaryList.Row>
        <SummaryList.Key>Full Name</SummaryList.Key>
        <SummaryList.Value>{fullname}</SummaryList.Value>
      </SummaryList.Row>
    );
    summary.push(
      <SummaryList.Row>
        <SummaryList.Key>Date of Birth</SummaryList.Key>
        <SummaryList.Value>{dob}</SummaryList.Value>
      </SummaryList.Row>
    );
    summary.push(
      <SummaryList.Row>
        <SummaryList.Key>NHS Number</SummaryList.Key>
        <SummaryList.Value>{nhs_number}</SummaryList.Value>
      </SummaryList.Row>
    );
    summary.push(
      <SummaryList.Row>
        <SummaryList.Key>Email Address</SummaryList.Key>
        <SummaryList.Value>{email}</SummaryList.Value>
      </SummaryList.Row>
    );
    summary.push(
      <SummaryList.Row>
        <SummaryList.Key>Mobile Number</SummaryList.Key>
        <SummaryList.Value>{mobile_number}</SummaryList.Value>
      </SummaryList.Row>
    );
    return <SummaryList>{summary}</SummaryList>;
  }
};

const createQRCode = (userData) => {
  let data = '';
  if (typeof userData.birthdate != 'undefined') {
    data = JSON.stringify(fhir);	
    data = data.replace('nhs_number', userData.nhs_number);
    data = data.replace('family_name', userData.family_name);
    data = data.replace('given_name', userData.given_name);
    data = data.replace('phone_number', userData.phone_number);
    data = data.replace('email_id', userData.email);
    data = data.replace('birthdate_admitme', userData.birthdate);
  }
  /*  if (typeof userData.birthdate != 'undefined') {
    dob = Moment(userData.birthdate).format('DD/MM/YYYY');
    if (typeof userData.nhs_number != 'undefined') {
      nhs_number = userData.nhs_number;
      nhs_number = nhs_number.substring(0, 3) + " " + nhs_number.substring(3, 6) + " " + nhs_number.substring(6, 11);
    }
     data = 'Full Name : ' + userData.given_name + " " + userData.family_name + '\n' +
      'Date of Birth : ' + dob + '\n' +
      'NHS Number : ' + nhs_number + '\n' +
       'Email Address : ' + userData.email + '\n' +
      'Phone Number : ' + userData.phone_number + '\n';
   } */
  return data;
};

export default function LoginCallback(props) {
  const [userInfo, setUserInfo] = useState({ "loading": "loading" });
  var code = props.location.state.code;
  const paramcode = code;
  const invokeToken = async () => {
    const corsURL = 'https://qh7tiboi2c.execute-api.eu-west-2.amazonaws.com/dev';
    if (!code) {
      return alert("No code found in query");
    }
    const response = await axios.post(corsURL, { code: code, redirectUri: appConfig.redirectUri });
    setUserInfo(response.data.result);

  };

  useEffect(() => {
    invokeToken();
  }, []);


  if (typeof userInfo.birthdate != 'undefined') {
    sessionStorage.setItem('userdata', JSON.stringify(userInfo));
    return (
      <div>
        <div className="nhsuk-width-container ">
          <main className="nhsuk-main-wrapper " id="maincontent" role="main">
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
                  <Label isPageHeading style={{fontSize:'28px'}}>Share your details with NHS staff</Label>
                  <BodyText>If you are arriving for an appointment, you can transfer your personal details securely to certain members of NHS staff.</BodyText>
                  <BodyText>Please check the details below are correct and  press Generate QR code when you are ready for them to scan your device.</BodyText>
                  {summaryAppointment(userInfo)}
                  <Link className='nhsuk-link' to={{
                    pathname: '/qrcode',
                    state: { code: createQRCode(userInfo), paramcode: paramcode }
                  }}> Generate QR code </Link>
                </Col>
              </Row>
            </Container>
          </main>
        </div>
      </div>
    );
  }
  else {
    if (sessionStorage.getItem('userdata') != null) {
      setUserInfo(JSON.parse(sessionStorage.getItem('userdata')));
    }
    return (
      <div>
        <div className="nhsuk-width-container ">
          <main className="nhsuk-main-wrapper " id="maincontent" role="main">
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
                  <Label isPageHeading>Share your details with NHS staff</Label>
                  {summaryAppointment(userInfo)}
                  <Link className='nhsuk-link-disabled' to={{
                    pathname: '/qrcode',
                    state: { code: createQRCode(userInfo), paramcode: paramcode }
                  }}> Generate QR code </Link>


                </Col>
              </Row>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}
