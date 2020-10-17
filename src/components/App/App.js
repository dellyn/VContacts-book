import React, { Component } from "react";
import "./App.scss";
import Header from "../Header";
import ContactList from "../ContactList";
import ContactAddForm from "../ContactAddForm";

export default class App extends Component {
  maxId = 100;
  state = {
    contactData: [
      {
        firstName: "Vova",
        lastName: "Olegovich",
        phone: "380978766813",
        email: "test@gmail.com",
        id: 1,
      },
      {
        firstName: "Name",
        lastName: "Front",
        phone: "380978766813",
        email: "test@gmail.com",
        id: 2,
      },
      {
        firstName: "Nazar",
        lastName: "Back",
        phone: "380978766813",
        email: "test@gmail.com",
        id: 3,
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
  addContact = (values) => {
    this.maxId = this.maxId++;
    const newContact = {
      id: this.maxId++,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
    };
    this.setState(({ contactData }) => {
      const newContactData = [...contactData, newContact];
      return {
        contactData: newContactData,
      };
    });
    console.log(this.state.contactData);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <ContactAddForm addContact={this.addContact} />
        <ContactList
          contacts={this.state.contactData}
          onDeleted={this.deleteContact}
        />
      </div>
    );
  }
}
