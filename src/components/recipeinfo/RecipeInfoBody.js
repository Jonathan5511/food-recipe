import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import heart from "../../assets/whiteheart.svg";
import redheart from "../../assets/redheart.svg";

const RecipeInfoBody = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  const apiToken = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiToken}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          let errorMessage = "Fetching data failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setFoodInfo(data);

        const favArray = JSON.parse(localStorage.getItem("fav")) || [];
        setIsFavorite(favArray.includes(data.id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, apiToken]);

  const handleClick = () => {
    history.push("/home");
  };

  const onAddToFav = (event) => {
    event.preventDefault();
    let favArray = JSON.parse(localStorage.getItem("fav")) || [];
    if (!favArray.includes(foodInfo.id)) {
      favArray.push(foodInfo.id);
      setIsFavorite(true);
    } else {
      favArray = favArray.filter((id) => id !== foodInfo.id);
      setIsFavorite(false);
    }
    localStorage.setItem("fav", JSON.stringify(favArray));
    console.log("Updated favorites:", favArray);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!foodInfo) return <div>No data available</div>;

  return (
    <Fragment>
      <div className="bg-[#F1F6FD]">
        <div className="relative flex">
          <img
            onClick={handleClick}
            className="absolute top-2 left-2 z-10 cursor-pointer"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1hcnJvdy1sZWZ0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xNiAxMkg4Ii8+PHBhdGggZD0ibTEyIDgtNCA0IDQgNCIvPjwvc3ZnPg=="
            alt="Back"
          />
          <h1 className="text-xl ml-12 lg:ml-8 lg:-mb-3 italic font-bold text-gray-900 lg:p-1.5 md:text-lg lg:text-2xl text-center lg:text-center">
            {foodInfo.title}
          </h1>
        </div>

        <button
          onClick={onAddToFav}
          className="absolute top-10 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg"
        >
          <img
            className={`transition-transform transform rounded-full w-12 h-12 object-cover p-2 cursor-pointer ${
              isFavorite ? "scale-125 shadow-xl" : ""
            }`}
            src={isFavorite ? redheart : heart}
            alt="Favorite Icon"
          />
        </button>

        <div className="p-5 min-h-screen lg:-mt-7 flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4 lg:relative">
          <div className="m-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:flex lg:items-start lg:justify-center lg:mt-7 lg:pl-6">
            <div className="lg:max-w-sm lg:w-full lg:h-auto lg:rounded-lg lg:shadow-lg lg:mb-6">
              <img
                src={foodInfo.image}
                alt={foodInfo.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="bg-white mb-2 p-4 rounded-lg shadow-md mx-auto max-w-6xl lg:col-start-2 lg:row-start-1 lg:row-span-1 lg:flex lg:items-start lg:justify-end lg:pr-6 lg:mt-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 md:text-2xl lg:text-xl text-center lg:text-left">
                Ingredients
              </h2>
              <div className="flex flex-wrap gap-4">
                {foodInfo?.extendedIngredients?.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={`https://img.spoonacular.com/ingredients_100x100/${item.image}`}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-full border border-gray-200"
                    />
                    <p className="text-base font-medium text-gray-700">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white mb-2 p-4 rounded-lg shadow-md mx-auto max-w-6xl lg:col-start-1 lg:row-start-2 lg:row-span-1 lg:flex lg:items-start lg:justify-start lg:pl-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 md:text-2xl lg:text-xl text-center lg:text-left">
                Instructions
              </h2>
              <div
                className="text-[90%]"
                dangerouslySetInnerHTML={{ __html: foodInfo.instructions }}
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mx-auto max-w-6xl lg:col-start-2 lg:row-start-2 lg:row-span-1 lg:flex lg:items-start lg:justify-end lg:pr-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 md:text-2xl lg:text-xl text-center lg:text-left">
                Summary
              </h2>
              <div
                className="text-[90%]"
                dangerouslySetInnerHTML={{ __html: foodInfo.summary }}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeInfoBody;
