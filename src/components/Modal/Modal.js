import React from "react";
import "./Modal.scss";
const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={() => setActive(false)}>
          x
        </button>
        <div className="modal-root">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
