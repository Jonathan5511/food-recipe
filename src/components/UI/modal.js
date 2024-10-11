import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modal";

const Backdrop = (props) => {
  const dispatch = useDispatch();

  const onCloseModal = (event) => {
    event.preventDefault();
    dispatch(modalActions.closemodal());
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-20"
      onClick={onCloseModal}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 animate-slide-down hide-scrollbar -translate-y-1/2 w-4/5 max-w-sm bg-white rounded-2xl shadow-lg z-30 overflow-y-auto max-h-[80vh] ">
      {props.children}
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
