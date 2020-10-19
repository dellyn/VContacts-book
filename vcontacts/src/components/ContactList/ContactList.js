import React from "react";
import ContactListItem from "../ContactListItem";

import "./ContactList.scss";

const ContactList = ({ contacts, onDeleted }) => {
  const contactListItem = contacts.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <ContactListItem
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
      />
    );
  });

  return (
    <section className="contact-list">
      <div className="container">
        <div className="contact-list-menu">{contactListItem}</div>
      </div>
    </section>
  );
};
export default ContactList;
