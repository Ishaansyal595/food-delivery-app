import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Backdrop = () => {
  const { dispatch, showModal, addressModal, categoryModal } =
    useContext(AppContext);

  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        if (showModal) {
          dispatch({ type: "TOGGLE_MODAL", payload: false });
        }
        if (addressModal) {
          dispatch({ type: "SET_ADDRESS_MODAL", payload: false });
        }
        if (categoryModal) {
          dispatch({ type: "SET_CATEGORY_MODAL", payload: false });
        }
      }}
    />
  );
};
const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<Overlay>{children}</Overlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
