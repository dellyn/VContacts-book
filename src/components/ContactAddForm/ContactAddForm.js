import React, { Component } from "react";
import Modal from "../Modal";
import "./ContactAddForm.scss";

export default class ContactAddForm extends Component {
  state = {
    modalActive: false,
    firstName: "qq",
    lastName: "",
    phone: "",
    email: "",
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onContactAdded = () => {
    const { modalActive, ...contactValues } = this.state;
    this.props.addContact({ ...contactValues });
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
      <div>
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
          add
        </button>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
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
          Add Contact
        </button>
      </div>
    );
  }
}
