import React from "react";
import ContactListItem from "../ContactListItem";

import "./ContactList.scss";

const ContactList = ({
  contacts,
  storage,
  onDeleted,
  addContactValue,
  deleteСontactValue,
  editContactValue,
  cancelLastChange,
}) => {
  const contactListItem = contacts.map((item) => {
    const { ...itemProps } = item;
    const { id } = item;
    return (
      <ContactListItem
        key={id}
        {...itemProps}
        storage={storage}
        onDeleted={() => onDeleted(id)}
        addContactValue={addContactValue}
        deleteСontactValue={deleteСontactValue}
        editContactValue={editContactValue}
        cancelLastChange={cancelLastChange}
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
