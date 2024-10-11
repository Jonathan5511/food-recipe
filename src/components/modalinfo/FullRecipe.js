import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const FullRecipe = () => {
  const foodItem = useSelector((state) => state.modal.modalitem);
  const foodInstructions = foodItem[0]?.instructions || "";
  const foodSummary = foodItem[0]?.summary || "";

  return (
    <Fragment>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h1 className="text-xl font-bold mb-2">Instructions</h1>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: foodInstructions }}
        ></p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-xl font-bold mb-2">Summary</h1>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: foodSummary }}
        ></p>
      </div>
    </Fragment>
  );
};

export default FullRecipe;
