import React, { Component } from "react";
import "./ContactListItem.scss";
import ContactDetails from "../ContactDetails";
export default class ContactListItem extends Component {
  state = {
    modalActive: false,
  };

  setModalActive = (statusActive) => {
    this.setState(({ modalActive }) => {
      return {
        modalActive: statusActive,
      };
    });
  };

  render() {
    const {
      onDeleted,
      addContactValue,
      deleteСontactValue,
      cancelLastChange,
      editContactValue,
      storage,
      ...contactDetails
    } = this.props;
    return (
      <div>
        <div
          className="contact-list-item"
          onClick={() => this.setModalActive(true)}
        >
          <div className="contact-person">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/1077/1077114.svg"
              alt="person"
              className="contact-person-img"
            />
            <p className="contact-person-name">
              {contactDetails.firstName} {contactDetails.lastName}
            </p>
          </div>
          <button className="delete-btn" onClick={this.props.onDeleted}>
            x
          </button>
        </div>
        <div
          className={
            this.state.modalActive
              ? "active contact-details-layer"
              : "contact-details-layer "
          }
        >
          <div className="contact-details-content ">
            <ContactDetails
              getContactData={contactDetails}
              storage={storage}
              deleteСontactValue={this.props.deleteСontactValue}
              editContactValue={editContactValue}
              addContactValue={addContactValue}
              cancelLastChange={cancelLastChange}
              setActive={this.setModalActive}
            />
          </div>
        </div>
      </div>
    );
  }
}
