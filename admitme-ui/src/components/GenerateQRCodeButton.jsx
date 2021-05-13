import React from "react";
import { Link } from "react-router-dom";
import { Button } from "nhsuk-react-components";

const fhir = require("../utils/fhir.json");

export default function GenerateQRCodeButton(props) {
  let button;

  if (props.userInfo === "loading" || props.userInfo === null) {
    button = <Button disabled>Generate QR code</Button>;
  } else {
    button = (
      <Link
        to={{
          pathname: "/qrcode",
          state: {
            code: createQRCode(props.userInfo),
            paramcode: props.code,
          },
        }}
      >
        <Button>Generate QR code</Button>
      </Link>
    );
  }

  return <>{button}</>;
}

function createQRCode(userData) {
  let data = JSON.stringify(fhir);
  if (typeof userData.birthdate != "undefined") {
    data = data.replace("nhs_number", userData.nhs_number);
    data = data.replace("family_name", userData.family_name);
    data = data.replace("given_name", userData.given_name);
    data = data.replace("phone_number", userData.phone_number);
    data = data.replace("email_id", userData.email);
    data = data.replace("birthdate_admitme", userData.birthdate);
  }
  return data;
}
