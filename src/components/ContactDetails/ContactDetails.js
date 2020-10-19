import React, { Component } from "react";
import Modal from "../Modal";
import "./ContactDetails.scss";

export default class ContactDetails extends Component {
  state = {
    addItem: false,
  };

  // toggle field for add new useк fielld
  onAddItem = () => {
    this.setState((state) => {
      return {
        addItem: !this.state.addItem,
      };
    });
  };
  addContactField = (userKeyField, userValueField, id) => {
    this.props.addContactValue(userKeyField, userValueField, id);
  };

  // Get value from inputs and write in state
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // controls state modal window
  setModalActive = (statusActive) => {
    this.setState(({ modalActive }) => {
      return {
        modalActive: statusActive,
      };
    });
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

  editField = (key, userKey, userValue, id) => {
    this.props.editContactValue(key, userKey, userValue, id);

    this.setState(() => {
      return {
        hideDelMod: true,
      };
    });
  };

  confirmCancel = () => {
    this.props.cancelLastChange();
    this.setModalActive(false);
  };
  onCancelChange = () => {
    this.setState(() => {
      return {
        hideDelMod: true,
      };
    });
    this.setModalActive(true);
  };

  // this function for process user data in custom field
  enterHandler = (e) => {
    this.setState({
      clearFields: false,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { getContactData, storage } = this.props;
    const id = getContactData.id;
    const contactListItem = Object.keys(getContactData)
      .filter((item) => item !== "id")
      .map((key) => {
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
                this.props.editContactValue(
                  key,
                  this.state[key],
                  this.state[getContactData[key]],
                  id
                )
              }
            >
              Edit
            </button>

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
                  <button onClick={() => this.confirmDeleteFild()}>Yes</button>
                  <button onClick={() => this.setModalActive(false)}>No</button>
                </div>
              </Modal>
            </div>
          </div>
        );
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
          onClick={this.onCancelChange}
        >
          Cancel last change
        </button>
        <Modal active={this.state.modalActive} setActive={this.setModalActive}>
          <div className="">
            <p className="confirm-text">Cancel changes?</p>
            <button onClick={() => this.confirmCancel()}>Yes</button>
            <button onClick={() => this.setModalActive(false)}>No</button>
          </div>
        </Modal>
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
