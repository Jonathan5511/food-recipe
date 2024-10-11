import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const SimilarRecipe = () => {
  const foodItems = useSelector((state) => state.food.foods);
  const foodData = JSON.parse(foodItems);
  console.log(foodData);

  return (
    <Fragment>
      <div className="">
        {foodData.recipes.map(({ title, image, readyInMinutes }, id) => {
          return (
            <div className="mx-4 grid grid-cols-1   gap-6 ">
              <a
                href="/"
                className="inline-flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="w-20 h-20 object-cover rounded-xl"
                  src={image}
                  alt=""
                />
                <div className="flex flex-col justify-between p-1 leading-normal">
                  <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                  </h5>
                  <p className="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">
                    Ready in {readyInMinutes}min
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default SimilarRecipe;
