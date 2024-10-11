import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const ModalIngredients = () => {
  const foodItem = useSelector((state) => state.modal.modalitem);
  const foodData = foodItem[0]?.extendedIngredients || [];

  return (
    <Fragment>
      <div className="flex overflow-x-auto space-x-3 py-2">
        {foodData.map((elm) => (
          <div
            key={elm.id}
            className="flex-shrink-0 flex items-center space-x-3 p-2 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <img
              src={`https://img.spoonacular.com/ingredients_100x100/${elm.image}`}
              alt={elm.name}
              className="w-10 h-10 object-cover rounded-full border border-gray-200"
            />
            <p className="text-base font-medium text-gray-700">{elm.name}</p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ModalIngredients;
