import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import food from "../../store/food";

const ScrollRecipe = () => {
  const foodItems = useSelector((state) => state.food.foods);
  const foodData = JSON.parse(foodItems);
  const history = useHistory();

  const openInfopage = (id) => {
    history.push(`/info/${id}`);
  };

  return (
    <Fragment>
      <div className="flex ml-10 italic mt-5 mb-2 font-bold">
        <p>Popular dishes</p>
      </div>
      <div className="mx-10 flex overflow-x-auto gap-6">
        {foodData?.recipes?.map(({ title, image, id, readyInMinutes }) => (
          <div
            key={id}
            onClick={() => openInfopage(id)}
            className="relative flex-shrink-0 flex-grow-0 w-36 h-36 rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-black/50 rounded-xl text-white flex items-center justify-center transition-opacity opacity-100 hover:opacity-50">
              <div className="text-center">
                <p className="font-bold text-sm pb-3">{title}</p>
                <p className="text-xs">Ready in {readyInMinutes}min</p>
              </div>
            </div>
            <img
              className="w-full h-full object-cover rounded-xl"
              src={image}
              alt={title}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ScrollRecipe;
