import React from "react";
import { SummaryList } from "nhsuk-react-components";
import Moment from "moment";

export default function UserInfo(props) {
  console.log("PROPS: ", props);
  const userInfo = props.userInfo;
  let fullname = "";
  let dob = "";
  let nhs_number = "";

  if (typeof userInfo.given_name != "undefined") {
    fullname = userInfo.given_name + " " + userInfo.family_name;
    if (typeof userInfo.birthdate != "undefined") {
      dob = Moment(userInfo.birthdate).format("DD/MM/YYYY");
    }
    if (typeof userInfo.nhs_number != "undefined") {
      nhs_number = userInfo.nhs_number;
      nhs_number =
        nhs_number.substring(0, 3) +
        " " +
        nhs_number.substring(3, 6) +
        " " +
        nhs_number.substring(6, 11);
    }
    let email = userInfo.email;
    let mobile_number = userInfo.phone_number;

    return (
      <>
        <SummaryList.Row>
          <SummaryList.Key>Full Name</SummaryList.Key>
          <SummaryList.Value>{fullname}</SummaryList.Value>

          <SummaryList.Key>Date of Birth</SummaryList.Key>
          <SummaryList.Value>{dob}</SummaryList.Value>

          <SummaryList.Key>NHS Number</SummaryList.Key>
          <SummaryList.Value>{nhs_number}</SummaryList.Value>

          <SummaryList.Key>Email Address</SummaryList.Key>
          <SummaryList.Value>{email}</SummaryList.Value>

          <SummaryList.Key>Mobile Number</SummaryList.Key>
          <SummaryList.Value>{mobile_number}</SummaryList.Value>
        </SummaryList.Row>
      </>
    );
  }
}
