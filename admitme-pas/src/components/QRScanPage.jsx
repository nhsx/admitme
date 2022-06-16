import React, { Component } from 'react'
import BarcodeReader from 'react-barcode-reader';
import { Container, Row, Col, Label, Button, InsetText } from "nhsuk-react-components";
import Moment from 'moment';

class QRScanPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nhsnumber: '',
      fullname: '',
      email: '',
      mobile: '',
      dob: '',
      disbld: true,
    }

    this.handleScan = this.handleScan.bind(this)
    this.cleardata = this.cleardata.bind(this)

  }

  logout() {

    window.location.href = "/";
  }

  handleScan(data) {
    // data is the keypresses sent by the bardcode reader (or testCode attribute)
    // we will mock the data with the intended QR code from https://www.innovationlab.nhs.uk/logincallback
    //data = { "resourceType": "Bundle", "meta": { "profile": ["https://fhir.hl7.org.uk/StructureDefinition/UKCore-Bundle"] }, "type": "message", "entry": [{ "fullUrl": "urn:uuid:b64c4afa-8261-11eb-8dcd-0242ac130003", "resource": { "resourceType": "Patient", "id": "b64c4afa-8261-11eb-8dcd-0242ac130003", "identifier": [{ "value": "123 456 7890" }], "name": [{ "use": "official", "family": "Abthorpe", "given": ["Saoirse"] }], "telecom": [{ "system": "phone", "value": "07701234567", "use": "mobile" }, { "system": "email", "value": "saoirse.abthorpe@domain.com" }], "birthDate": "30 March 1954" } }] }
    //let parsed = data;

    // Warning: there is very (no) exception handling once the minimum number of keys (6) is sent through this function

    let parsed = JSON.parse(data);
    let resource = parsed.entry[0].resource;
    let nhs_number = resource.identifier[0].value;
    this.setState({
      nhsnumber: nhs_number.substring(0, 3) + " " + nhs_number.substring(3, 6) + " " + nhs_number.substring(6, 11),
      fullname: resource.name[0].given[0] + ' ' + resource.name[0].family,
      mobile: resource.telecom[0].value,
      email: resource.telecom[1].value,
      dob: Moment(resource.birthDate).format('DD/MM/YYYY'),
      disbld: false,
    })
  }

  handleError(err) {
    console.error(err)
  }

  cleardata() {
    this.setState({
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
    const labelstyle = { fontFamily: "Frutiger W01, Arial, Sans-serif", fontWeight: 'bold', fontSize: '16px' }

    return (
      <div className="nhsuk-width-container" >
        <Button style={{
          position: "absolute",
          right: '10px',
          top: '5px'
        }} onClick={this.logout} > Logout</Button>

        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <Row>
              <Col width="two-thirds">
                <Label isPageHeading style={{ fontSize: '28px' }}>Welcome to NHSX Mock PAS</Label>
                <p style={{
                  position: "absolute",
                  right: '50px',
                  top: '115px'
                }} ><b> Logged in as {code}</b></p>
                <InsetText>
                  <p>
                    Use your barcode scanner now to scan a patient's details.
                  </p>
                </InsetText>

                <BarcodeReader
                  onError={this.handleError}
                  onScan={this.handleScan}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label style={labelstyle}>Full Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" value={this.state.fullname} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor: "lightgray" }} disabled={true} />
                <br />
                <br />

                <label style={labelstyle}>Date Of Birth&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" value={this.state.dob} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor: "lightgray" }} disabled={true} />
                <br />
                <br />

                <label style={labelstyle}>NHS Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" value={this.state.nhsnumber} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor: "lightgray" }} disabled={true} />
                <br />
                <br />

                <label style={labelstyle}>Email Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" value={this.state.email} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor: "lightgray" }} disabled={true} />
                <br />
                <br />

                <label style={labelstyle}><b>Mobile Number&nbsp;&nbsp;</b></label>
                <input type="text" value={this.state.mobile} style={{ height: '40px', width: '300px', padding: '4px', border: '2px solid #4c6272', fontFamily: "inherit", backgroundColor: "lightgray" }} disabled={true} />
                <br />
                <br />

                {/* <Button disabled={true}>Search</Button> */}
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                <Button onClick={this.cleardata} disabled={this.state.disbld}>Clear</Button>

              </Col>
            </Row>

          </Container>
        </main>

      </div>


    )
  }
}

export default QRScanPage;