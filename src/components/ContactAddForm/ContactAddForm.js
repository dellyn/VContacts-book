import React, { Component } from "react";
import Modal from "../Modal";
import "./ContactAddForm.scss";

export default class ContactAddForm extends Component {
  state = {
    modalActive: false,
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onContactAdded = () => {
    const { modalActive, ...contactValues } = this.state;
    this.props.addContact({ ...contactValues });
    this.setModalActive(false);
  };
  setModalActive = (statusActive) => {
    this.setState(({ modalActive }) => {
      return {
        modalActive: statusActive,
      };
    });
  };

  render() {
    const children = (
      <div className="contact-add-child">
        <p>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            placeholder="Name"
            onChange={this.onChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={this.onChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={this.onChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={this.onChangeHandler}
          />
        </p>
        <button className="add-contact-btn" onClick={this.onContactAdded}>
          Add Contact
        </button>
      </div>
    );
    return (
      <div className="contact-add-form">
        <Modal active={this.state.modalActive} setActive={this.setModalActive}>
          {children}
        </Modal>
        <button
          className="add-contact"
          onClick={() => this.setModalActive(true)}
        >
          +
        </button>
        <h1 className="logo">
          <span>VC</span>ontacts
        </h1>
      </div>
    );
  }
}
