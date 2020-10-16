import React, { Component } from "react";
import "./App.scss";
import Header from "../Header";
import ContactList from "../ContactList";
import ContactAddForm from "../ContactAddForm";
import Modal from "../Modal";

export default class App extends Component {
  // const { modalActive, setModalActive } = ;

  state = {
    modalActive: false,
    contactData: [
      {
        firstName: "Kek",
        lastName: "Olegovich",
        id: 1,
        phone: "380978766813",
        email: "test@gmail.com",
      },
      {
        firstName: "Vova",
        lastName: "Front",
        id: 2,
        phone: "380978766813",
        email: "test@gmail.com",
      },
      {
        firstName: "Katia",
        lastName: "Back",
        id: 3,
        phone: "380978766813",
        email: "test@gmail.com",
      },
    ],
  };

  deleteContact = (id) => {
    this.setState(({ contactData }) => {
      const index = contactData.findIndex((el) => el.id === id);
      console.log("index", index);
      const newContactData = [
        ...contactData.slice(0, index),
        ...contactData.slice(index + 1),
      ];

      return {
        contactData: newContactData,
      };
    });
  };

  // setModalActive = (modalInactive) => {
  //   this.setState(({ modalActive }) => {
  //     console.log("close", modalActive);
  //     return {
  //       modalActive: modalInactive,
  //     };
  //   });
  // };
  setModalActive = (statusActive) => {
    this.setState(({ modalActive }) => {
      return {
        modalActive: statusActive,
      };
    });
  };
  render() {

    return (
      <div className="App">
        <Modal
          active={this.state.modalActive}
          setActive={this.setModalActive}
        ></Modal>
        <Header />
        <ContactAddForm setActive={this.setModalActive} />
        <ContactList
          contacts={this.state.contactData}
          onDeleted={this.deleteContact}
        />
      </div>
    );
  }
}
