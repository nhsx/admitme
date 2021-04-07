import React, { Component } from 'react'
import BarcodeReader from 'react-barcode-reader'
import { Container, Row, Col, Label, Button } from "nhsuk-react-components";
import qrlogo from "../img/qrlogo.png";
import Moment from 'moment';

class QRScanPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      result: 'No result',
      nhsnumber: '',
      fullname: '',
      email: '',
      mobile: '',
      dob: '',
      disbld : true,
    }

    this.handleScan = this.handleScan.bind(this)
    this.cleardata = this.cleardata.bind(this)

  }
  handleScan(data) {
    let d = JSON.parse(data)
    d.entry.map((test) => {
      let nhs_number = test.resource.identifier[0].value;
      this.setState({
        result: data,
        nhsnumber: nhs_number.substring(0, 3) + " " + nhs_number.substring(3, 6) + " " + nhs_number.substring(6, 11),
        fullname: test.resource.name[0].given[0] + ' ' + test.resource.name[0].family,
        mobile: test.resource.telecom[0].value,
        email: test.resource.telecom[1].value,
        dob: Moment(test.resource.birthDate).format('DD/MM/YYYY'),
        disbld : false,
      })
    }
    )
  }
  handleError(err) {
    console.error(err)
  }

  cleardata() {
    this.setState( {
      result: 'No result',
      nhsnumber: '',
      fullname: '',
      email: '',
      mobile: '',
      dob: '',
      disbld: true,
    })
  }


  render() {

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("user");
    const labelstyle = { fontFamily: "Frutiger W01, Arial, Sans-serif", fontWeight: 'bold', fontSize: '16px' };

    return (
      <div className="nhsuk-width-container" >
        <Button style={{
          position: "absolute",
          right: '10px',
          top: '5px'
        }} onClick={this.getAuthCode} > Logout</Button>

        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <Row>
              <Col>
                <Button onClick={this.scanQR} disabled={true}> Scan</Button>&nbsp;&nbsp;
                <img style ={{height:'60px',width: '60px'}} src={qrlogo}></img>
                <BarcodeReader
                  onError={this.handleError}
                  onScan={this.handleScan}
                />
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
                <label style={labelstyle}>Full Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" value={this.state.fullname} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor:"darkgrey" }} disabled={true}/>
                <br />
                <br />

                <label style={labelstyle}>Date Of Birth&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" value={this.state.dob} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor: "darkgrey" }} disabled={true}/>
                <br />
                <br />

                <label style={labelstyle}>NHS Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" value={this.state.nhsnumber}  style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor:"darkgrey" }} disabled={true}/>
                <br />
                <br />

                <label style={labelstyle}>Email Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" value={this.state.email} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor:"darkgrey" }} disabled={true}/>
                <br />
                <br />

                <label style={labelstyle}><b>Mobile Number&nbsp;&nbsp;</b></label>
                            <input type="text" value={this.state.mobile} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor:"darkgrey" }} disabled={true}/>
                <br />
                <br />

                <Button disabled={true}>Search</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.cleardata} disabled={this.state.disbld}>Clear</Button>
                
              </Col>
            </Row>
            <Row style = {{backgroundColor: 'grey'}}>
              <Col width="two-thirds">
                <br />
                <Label isPageHeading style={{ fontSize: '28px' }}>Patient Profile </Label>
              </Col>

            </Row>

          </Container>
        </main>

      </div>


    )
  }
}

export default QRScanPage;