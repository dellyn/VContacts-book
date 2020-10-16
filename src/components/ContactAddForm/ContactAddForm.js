import React, { Component } from "react";
// import Modal from "../Modal";
import "./ContactAddForm.scss";

const ContactAddForm = ({ setActive }) => {
  const elem = <h2>h2</h2>;

  return (
    <div>
      <button className="add-contact" onClick={() => setActive(true)}>
        Add Contact
      </button>
    </div>
  );
};
export default ContactAddForm;
