import React, { Component } from "react";
import "./ContactListItem.scss";

export default class ContactListItem extends Component {
  onContactClick = () => {
    console.log(this.props);
  };

  render() {
    const { firstName, lastName } = this.props;
    return (
      <div className="contact-list-item">
        <div className="contact-person" onClick={this.onContactClick}>
          <img src="" alt="person" className="contact-person-img" />
          <p className="contact-person-name">
            {firstName} {lastName}
          </p>
        </div>
        <button className="delete-btn" onClick={this.props.onDeleted}>
          x
        </button>
      </div>
    );
  }
}
