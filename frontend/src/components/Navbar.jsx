import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

const Navbar = () => {

  const navigate =
    useNavigate();

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    checkLogin();

    window.addEventListener(
      "storage",
      checkLogin
    );

    return () => {

      window.removeEventListener(
        "storage",
        checkLogin
      );
    };

  }, []);

  const checkLogin = () => {

    const token =
      localStorage.getItem("token");

    const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    setIsLoggedIn(!!token);

    setUser(storedUser);
  };

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setIsLoggedIn(false);

    setUser(null);

    navigate("/login");
  };

  return (

    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-green-600 cursor-pointer"
        >
          NoBroker
        </h1>

        <ul className="hidden md:flex gap-8 font-medium items-center">

          <Link to="/">
            <li className="hover:text-green-600 cursor-pointer">
              Home
            </li>
          </Link>

          <Link to="/properties">
            <li className="hover:text-green-600 cursor-pointer">
              Properties
            </li>
          </Link>

          <Link to="/about">
            <li className="hover:text-green-600 cursor-pointer">
              About
            </li>
          </Link>

          <Link to="/contact">
            <li className="hover:text-green-600 cursor-pointer">
              Contact
            </li>
          </Link>

         

        </ul>

        <div className="flex gap-4">

          {isLoggedIn ? (

            <>

              <button
                onClick={() =>
                  navigate("/profile")
                }
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50"
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <button
                onClick={() =>
                  navigate("/login")
                }
                className="border border-green-600 text-green-600 px-5 py-2 rounded-lg hover:bg-green-50"
              >
                Login
              </button>

              <button
                onClick={() =>
                  navigate("/signup")
                }
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Signup
              </button>

            </>

          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;