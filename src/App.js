import React, { Component } from "react";
import "./App.scss";
import ContactList from "../src/components/ContactList";
import ContactAddForm from "../src/components/ContactAddForm";

export default class App extends Component {
  maxId = 100;
  state = {
    contactData: [
      {
        firstName: "Volodymyr",
        lastName: "Velikiy",
        phone: "380978766813",
        email: "test@gmail.com",
        id: 1,
      },
      {
        firstName: "Anatoliy",
        lastName: "Kurcha",
        phone: "380734080939",
        email: "mail@gmail.com",
        id: 2,
      },
      {
        firstName: "Test",
        lastName: "Crack",
        phone: "3809999999",
        email: "test@gmail.com",
        id: 3,
      },
    ],
    cancelBtn: false,
    // storage keeps the last user change
    storage: null,
  };

  // Delete contacts field
  deleteСontactValue = (contactValue, contactId) => {
    this.setState(({ contactData }) => {
      const index = contactData.findIndex((el) => el.id === contactId);
      let operationElem = Object.assign({}, contactData[index]);
      delete operationElem[contactValue];
      const newContactData = [
        ...contactData.slice(0, index),
        operationElem,
        ...contactData.slice(index + 1),
      ];
      return {
        contactData: newContactData,
        storage: contactData[index],
      };
    });
  };
  // Delete all info about contact
  deleteContact = (contactId) => {
    this.setState(({ contactData }) => {
      const index = contactData.findIndex((el) => el.id === contactId);
      const newContactData = [
        ...contactData.slice(0, index),
        ...contactData.slice(index + 1),
      ];

      return {
        contactData: newContactData,
      };
    });
  };
  // Adding new contact
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
  };
  // Adding new fields for contact
  addContactValue = (userKeyField, userValueField, contactId) => {
    if (userKeyField && userValueField !== undefined) {
      this.setState(({ contactData }) => {
        const index = contactData.findIndex((el) => el.id === contactId);
        let operationElem = Object.assign({}, contactData[index]);
        operationElem[userKeyField] = userValueField;
        const newContactData = [
          ...contactData.slice(0, index),
          operationElem,
          ...contactData.slice(index + 1),
        ];

        return {
          contactData: newContactData,
          storage: contactData[index],
        };
      });
    }
  };
  // User editing of fields
  editContactValue = (
    editedField,
    contactKeyField,
    contactValueField,
    contactId
  ) => {
    if (
      (editedField !== undefined && contactKeyField !== undefined) ||
      contactValueField !== undefined
    ) {
      this.setState(({ contactData }) => {
        const index = contactData.findIndex((el) => el.id === contactId);
        let operationArr = Object.assign({}, contactData[index]);

        if (contactValueField !== undefined) {
          operationArr[editedField] = contactValueField;
        }

        if (editedField !== contactKeyField && contactKeyField !== undefined) {
          Object.defineProperty(
            operationArr,
            contactKeyField,
            Object.getOwnPropertyDescriptor(operationArr, editedField)
          );
          delete operationArr[editedField];
        }

        const newContactData = [
          ...contactData.slice(0, index),
          operationArr,
          ...contactData.slice(index + 1),
        ];

        return {
          storage: contactData[index],

          contactData: newContactData,
        };
      });
    }
  };

  // backup the last changes and restore him
  cancelLastChange = () => {
    if (this.state.storage !== null) {
      this.setState(({ storage, contactData }) => {
        const index = contactData.findIndex((el) => el.id === storage.id);
        const newContactData = [
          ...contactData.slice(0, index),
          storage,
          ...contactData.slice(index + 1),
        ];
        return {
          contactData: newContactData,
          storage: null,
        };
      });
    } else {
      this.setState((state) => {
        return {
          cancelBtn: true,
        };
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="app-block">
            <ContactAddForm addContact={this.addContact} />
            <ContactList
              addContactValue={this.addContactValue}
              cancelLastChange={this.cancelLastChange}
              contacts={this.state.contactData}
              storage={this.state.storage}
              onDeleted={this.deleteContact}
              deleteСontactValue={this.deleteСontactValue}
              editContactValue={this.editContactValue}
            />
          </div>
        </div>
      </div>
    );
  }
}
