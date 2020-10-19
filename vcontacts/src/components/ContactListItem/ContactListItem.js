import React, { Component } from "react";
import "./ContactListItem.scss";
import Modal from "../Modal";
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
    const { firstName, lastName } = this.props;
    const { ...contactDetails } = this.props;

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
              {firstName} {lastName}
            </p>
          </div>
          <button className="delete-btn" onClick={this.props.onDeleted}>
            x
          </button>
        </div>
        <Modal active={this.state.modalActive} setActive={this.setModalActive}>
          <ContactDetails getContactData={contactDetails} />
        </Modal>
      </div>
    );
  }
}
