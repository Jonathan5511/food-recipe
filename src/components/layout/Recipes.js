import React, { Fragment, useEffect } from "react";
import ScrollRecipe from "../recipe/ScrollRecipe";
import { useDispatch, useSelector } from "react-redux";
import { foodActions } from "../../store/food";
import AllRecipe from "../recipe/AllRecipe";

const Recipes = (props) => {
  const dispatch = useDispatch();
  const recipesData = useSelector((state) => state.food.foods);

  useEffect(() => {
    if (!recipesData) {
      fetch(
        `https://api.spoonacular.com/recipes/random?number=20&apiKey=${process.env.REACT_APP_API_KEY}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Fetching data failed";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
          dispatch(foodActions.food(data));
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [dispatch, recipesData]);

  return (
    <Fragment>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start lg:items-center lg:flex-row">
          <div className="text-center lg:text-left lg:w-1/2">
            <p className="text-lg font-semibold italic ml-12 lg:ml-24">
              Discover tasty healthy recipes!
            </p>
          </div>
        </div>
        <div className="mt-6 lg:mt-12">
          <ScrollRecipe />
        </div>
        <div className="mt-6 lg:mt-12">
          <AllRecipe onDisplayModal={props.onDisplayModal} />
        </div>
      </div>
    </Fragment>
  );
};

export default Recipes;
