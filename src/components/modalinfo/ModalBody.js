import React, { Fragment, useState, useEffect } from "react";
import Modal from "../UI/modal";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import SimilarRecipe from "./SimilarRecipe";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal";
import ModalIngredients from "./ModalIngredients";
import FullRecipe from "./FullRecipe";
import heart from "../../assets/whiteheart.svg";
import redheart from "../../assets/redheart.svg";

const ModalBody = (props) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const foodItem = useSelector((state) => state.modal.modalitem);
  const foodTitle = foodItem[0].title;
  const foodImage = foodItem[0].image;
  const foodId = foodItem[0].id;

  useEffect(() => {
    const favArray = JSON.parse(localStorage.getItem("fav")) || [];
    setIsFavorite(favArray.includes(foodId));
  }, [foodId]);

  const onAddToFav = (event) => {
    event.preventDefault();
    let favArray = JSON.parse(localStorage.getItem("fav")) || [];
    if (!favArray.includes(foodId)) {
      favArray.push(foodId);
      setIsFavorite(true);
    } else {
      favArray = favArray.filter((id) => id !== foodId);
      setIsFavorite(false);
    }
    localStorage.setItem("fav", JSON.stringify(favArray));
    console.log("Updated favorites:", favArray);
  };

  const onCloseModal = (event) => {
    event.preventDefault();
    dispatch(modalActions.closemodal());
  };

  return (
    <Fragment>
      <Modal onClose={props.onClose}>
        <div className="w-full p-4 -mt-5 divide-black/5 bg-black/5 flex items-center">
          <img
            className="transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={onCloseModal}
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1hcnJvdy1sZWZ0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xNiAxMkg4Ii8+PHBhdGggZD0ibTEyIDgtNCA0IDQgNCIvPjwvc3ZnPg=="
            alt="img"
          />
          <h1 className="ml-2 p-2 text-2xl font-semibold">{foodTitle}</h1>
        </div>

        <div className="relative w-full">
          <img
            src={foodImage}
            alt={foodTitle}
            className="w-full object-cover"
          />
          <button
            onClick={onAddToFav}
            className="absolute top-2 left-2 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg"
          >
            <img
              className={`transition-transform transform rounded-full w-12 h-12 object-cover p-3 cursor-pointer ${
                isFavorite ? "scale-125 shadow-xl" : ""
              }`}
              src={isFavorite ? redheart : heart}
              alt="Clickable Icon"
            />
          </button>
        </div>

        <div className="w-full bg-black/5 rounded-xl">
          <div className="w-full max-w-lg divide-y divide-black/5">
            <Disclosure as="div" className="p-2">
              {({ open }) => (
                <>
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <span
                      className={`text-base font-medium ${
                        open ? "text-black/80" : "text-black"
                      }`}
                    >
                      Ingredients
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 text-sm text-black/50 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    <ModalIngredients />
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="p-2">
              {({ open }) => (
                <>
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <span
                      className={`text-base font-medium ${
                        open ? "text-black/80" : "text-black"
                      }`}
                    >
                      Full recipe
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 text-sm text-black/50">
                    <FullRecipe />
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="p-2">
              {({ open }) => (
                <>
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <span
                      className={`text-base font-medium ${
                        open ? "text-black/80" : "text-black"
                      }`}
                    >
                      Similar recipe
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 text-sm text-black/50">
                    <SimilarRecipe />
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ModalBody;
