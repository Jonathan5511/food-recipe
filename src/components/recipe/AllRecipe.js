import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AllRecipe = (props) => {
  const foodItems = useSelector((state) => state.food.foods);
  const foodData = JSON.parse(foodItems);
  console.log(foodData);
  const history = useHistory();

  const openInfopage = (id) => {
    history.push(`/info/${id}`);
  };

  return (
    <Fragment>
      <div className="flex ml-10 italic mt-5 mb-2 font-bold">
        <p>All Recipes</p>
      </div>
      <div className="mx-10 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {foodData?.recipes?.map(({ title, image, id, readyInMinutes }) => {
          return (
            <div
              key={id}
              onClick={() => openInfopage(id)}
              className="flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xs hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-24 h-24 md:w-32 md:h-32 rounded-t-lg md:rounded-none md:rounded-s-lg"
                src={image}
                alt="No image"
              />
              <div className="flex flex-col justify-between p-1 leading-normal">
                <h5 className="mb-2 text-sm p-2 font-bold tracking-tight text-gray-900 dark:text-white">
                  {title}
                </h5>
                <p className="mb-3 p-2 font-normal text-xs text-gray-700 dark:text-gray-400">
                  Ready in {readyInMinutes}min
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default AllRecipe;
