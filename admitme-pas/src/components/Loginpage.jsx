import React, { useState } from "react";
import { Container, BodyText, Button, Input, Form } from "nhsuk-react-components";
import { appConfig } from "../config";

const getAuthCode = () => {
  window.location.href = '/';
};

function Loginpage() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    let username = `${name}`;
    let password_new = `${password}`;
    if (username == appConfig.userid && password_new == appConfig.passowrd) {
      window.location.href = '/ScanQR?user=' + username;
      return true;
    } else {
      alert('Invalid Username/Password')
      return false;
    }

  }


  return (
    <div>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <BodyText><b>Welocme to NHS PAS</b></BodyText>
            <Form onSubmit={handleSubmit}>
              <Input type="text" onChange={e => setName(e.target.value)} placeholder="Enter username" style={{ width: '250px' }} label='UserName' />
              <Input type="password" onChange={e => setPassword(e.target.value)} style={{ width: '250px' }} placeholder="Enter password" label='Password' id='password' />
              <Button style={{ width: '120px' }} >Login</Button>
            </Form>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default Loginpage;