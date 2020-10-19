import "./ContactDetails.scss";

import React from "react";

const ContactDetails = ({ getContactData }) => {
  console.log(getContactData);
  const { firstName, lastName, phone, email, id } = getContactData;
  return (
    <div className="contact-details">
      <ul>
        <li className="contact-details-item">
          {firstName} {lastName}
        </li>
        <li className="contact-details-item">{phone}</li>
        <li className="contact-details-item">{email}</li>
      </ul>
    </div>
  );
};
export default ContactDetails;
