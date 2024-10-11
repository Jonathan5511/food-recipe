import React, { Fragment } from "react";
import Header from "../components/layout/Header";
import Recipes from "../components/layout/Recipes";
import ModalBody from "../components/modalinfo/ModalBody";
import { useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [onModalShow, setOnModalShow] = useState(false);
  const modalShow = useSelector((state) => state.modal.isopen);

  const hideModalHandler = () => {
    setOnModalShow(false);
  };

  const onDisplayModal = () => {
    setOnModalShow(true);
  };

  return (
    <Fragment>
      <div className=" w-full bg-[#F1F6FD]">
        <Header />
        <Recipes onDisplayModal={onDisplayModal} />
        {modalShow && (
          <ModalBody closeModal={hideModalHandler} onClose={hideModalHandler} />
        )}
      </div>
    </Fragment>
  );
};

export default Home;
