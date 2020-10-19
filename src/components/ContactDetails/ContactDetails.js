import React, { Component } from "react";
import Modal from "../Modal";
import "./ContactDetails.scss";

export default class ContactDetails extends Component {
  userValueId = 100;
  state = {
    addItem: false,
  };
  onAddItem = () => {
    this.setState((state) => {
      return {
        addItem: !this.state.addItem,
      };
    });
  };
  onChangeHandler = (e) => {
    this.userKeyField = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  setModalActive = (statusActive) => {
    this.setState(({ modalActive }) => {
      return {
        modalActive: statusActive,
      };
    });
  };

  addContactField = (userKeyField, userValueField, id) => {
    this.props.addContactValue(userKeyField, userValueField, id);
  };
  deleteField = (key, id) => {
    this.setState(() => {
      return {
        modalDeleteId: id,
        modalDeleteKey: key,
        modalActive: true,
        hideDelMod: false,
      };
    });
  };
  confirmDeleteFild = () => {
    this.props.deleteСontactValue(
      this.state.modalDeleteKey,
      this.state.modalDeleteId
    );
    this.setModalActive(false);
  };
  enterHandler = (e) => {
    this.setState({
      clearFields: false,
      [e.target.name]: e.target.value,
    });
  };
  editField = (key, userKey, userValue, id) => {
    this.setState(() => {
      return {
        modalEditKey: key,
        modalEditUserKey: userKey,
        modalEditUserValue: userValue,
        modalEditId: id,

        hideDelMod: true,
        modalActive: true,
      };
    });
  };
  confirmEditField = () => {
    this.props.editContactValue(
      this.state.modalEditKey,
      this.state.modalEditUserKey,
      this.state.modalEditUserValue,
      this.state.modalEditId
    );
    this.setState(() => {
      return {
        clearFields: true,
      };
    });
    this.setModalActive(false);
  };

  render() {
    const { getContactData, storage } = this.props;
    const id = getContactData.id;
    const contactListItem = Object.keys(getContactData)
      .filter((item) => item !== "id")
      .map((key) => {
        // if (key !== "id") {
        return (
          <div key={getContactData[key]}>
            <input
              type="text"
              name={key}
              placeholder={key}
              onChange={this.enterHandler}
            />
            <input
              type="text"
              placeholder={getContactData[key]}
              name={getContactData[key]}
              onChange={this.enterHandler}
            />

            <button
              className="edit-item"
              onClick={() =>
                this.editField(
                  key,
                  this.state[key],
                  this.state[getContactData[key]],
                  id
                )
              }
            >
              Edit
            </button>
            <Modal
              active={this.state.modalActive}
              setActive={this.setModalActive}
            >
              <div className="">
                <p className="confirm-text">Edit Confirmation</p>
                <button onClick={() => this.confirmEditField()}>Edit</button>
                <button onClick={() => this.setModalActive(false)}>No</button>
              </div>
            </Modal>
            <button
              className="add-contact"
              onClick={() => this.deleteField(key, id)}
            >
              Delete
            </button>
            <div className={this.state.hideDelMod ? "dn" : ""}>
              <Modal
                active={this.state.modalActive}
                setActive={this.setModalActive}
              >
                <div className="">
                  <p className="confirm-text">Delete confirmation</p>
                  <button onClick={() => this.confirmDeleteFild()}>
                    Delete
                  </button>
                  <button onClick={() => this.setModalActive(false)}>No</button>
                </div>
              </Modal>
            </div>
          </div>
        );
        // }
      });
    const { userKeyField, userValueField } = this.state;
    return (
      <div className="contact-details">
        <h1 className="contact-details-title">Contact Information</h1>
        <button className="close" onClick={() => this.props.setActive(false)}>
          X
        </button>

        <button className="add-item" onClick={this.onAddItem}>
          Add field
        </button>
        <button
          className={storage !== null ? "step-back" : "dn"}
          onClick={() => this.props.cancelLastChange()}
        >
          Cancel last change
        </button>
        <ul>{contactListItem}</ul>
        <div
          className={this.state.addItem ? "custom-field" : "custom-field dn"}
        >
          <div>
            <input
              type="text"
              name="userKeyField"
              placeholder="..key"
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              name="userValueField"
              placeholder="..value"
              onChange={this.onChangeHandler}
            />
            <button
              className="add-item"
              onClick={() =>
                this.addContactField(userKeyField, userValueField, id)
              }
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }
}
