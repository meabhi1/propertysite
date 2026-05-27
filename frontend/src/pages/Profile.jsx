import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../utils/api";

const Profile = () => {

  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;
    }

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const res = await API.get(
        "/auth/profile"
      );

      if (res.data.success) {

        setUser(res.data.user);
      }

    } catch (error) {

      console.log(error);

      localStorage.removeItem(
        "token"
      );

      navigate("/login");

    } finally {

      setLoading(false);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-screen">

        Loading...

      </div>
    );
  }

  return (

    <div>

      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">

        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold mb-5">

              {user?.fullname?.charAt(0)}

            </div>

            <h1 className="text-4xl font-bold mb-2">

              {user?.fullname}

            </h1>

            <p className="text-gray-500 text-lg">

              {user?.email}

            </p>

          </div>

          <div className="mt-10 space-y-5">

            <div className="border rounded-xl p-4">

              <p className="text-gray-500">
                Full Name
              </p>

              <h2 className="text-xl font-semibold">

                {user?.fullname}

              </h2>

            </div>

            <div className="border rounded-xl p-4">

              <p className="text-gray-500">
                Email Address
              </p>

              <h2 className="text-xl font-semibold">

                {user?.email}

              </h2>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Profile;