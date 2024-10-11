import React, { Fragment, useState, useRef, useEffect } from "react";
import Logo from "../../assets/Recipe Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { modalActions } from "../../store/modal";
import heart from "../../assets/whiteheart.svg";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const mailId = useSelector((state) => state.auth.mailId);
  const foodItems = useSelector((state) => state.food.foods);
  const foodData = JSON.parse(foodItems || "{}");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    setSearchResults(foodData?.recipes || []);
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    const result = (foodData?.recipes || []).filter((item) =>
      item?.title?.toLowerCase().startsWith(value.toLowerCase())
    );
    setSearchResults(result);

    setIsDropdownOpen(value.length > 0 && result.length > 0);
  };

  const onEnterModal = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const itemModal = foodData?.recipes.filter((item) =>
        item.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );

      if (itemModal.length > 0) {
        dispatch(modalActions.openmodal(itemModal));
      }
    }
  };

  const onFavHandler = (event) => {
    event.preventDefault();
    history.push("/fav");
  };

  const onEnterModalList = (title) => {
    const itemModal = foodData.recipes.filter(
      (item) => item.title.toLowerCase() === title.toLowerCase()
    );
    dispatch(modalActions.openmodal(itemModal));
  };

  const onLogoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsDropdownOpen(searchTerm.length > 0 && searchResults.length > 0);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <Fragment>
      <header>
        <nav className="bg-transparent border-gray-200 px-4 py-2.5 dark:bg-gray-800 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between mx-auto max-w-screen-xl">
            <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
              <img src={Logo} className="h-6 sm:h-9" alt="Logo" />
              <span className="text-2xl sm:text-3xl font-semibold whitespace-nowrap text-[#5B616E] italic mx-4">
                Reciipie
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <span className="text-sm sm:text-lg text-gray-900 dark:text-white italic">
                Hey, {mailId}!
              </span>
              <button
                onClick={onFavHandler}
                type="button"
                className="flex items-center space-x-2 text-sm sm:text-base text-gray-900 transition-transform transform hover:scale-105 hover:shadow-xl bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <img className="h-5 w-5" src={heart} alt="heart" />
                <span>Favorite</span>
              </button>
            </div>
            <form className="relative lg:mr-28 flex items-center w-full max-w-lg mt-4 sm:mt-0">
              <label
                htmlFor="default-search"
                className="sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative flex flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  ref={searchInputRef}
                  className="block w-full py-2 px-4 pl-10 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search any recipe"
                  required
                  value={searchTerm}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={onEnterModal}
                />
                {isDropdownOpen && searchResults.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10 dark:bg-gray-800 dark:border-gray-600"
                    style={{ borderTop: "2px solid #e5e7eb" }}
                  >
                    <ul className="p-2">
                      {searchResults.map((item) => (
                        <li
                          key={item.title}
                          className="py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            setSearchTerm(item.title);
                            setIsDropdownOpen(false);
                            onEnterModalList(item.title);
                          }}
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </form>
          </div>
          <button
            type="button"
            className="absolute top-2 right-4 text-sm sm:text-base text-gray-900 transition-transform transform hover:scale-105 hover:shadow-xl bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={onLogoutHandler}
          >
            Logout
          </button>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
