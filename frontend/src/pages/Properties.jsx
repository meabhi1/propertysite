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

const Properties = () => {

  const navigate =
    useNavigate();

  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // GET USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchProperties();

  }, []);

  const fetchProperties =
    async () => {

      try {

        const res =
          await API.get(
            "/property/all"
          );

        setProperties(
          res.data.properties
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // DELETE PROPERTY
  const handleDelete =
    async (id) => {

      try {

        const confirmDelete =
          window.confirm(
            "Delete this property?"
          );

        if (!confirmDelete)
          return;

        const res =
          await API.delete(
            `/property/delete/${id}`
          );

        alert(
          res.data.message
        );

        fetchProperties();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message
        );
      }
    };

  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-screen text-2xl font-bold">

        Loading...

      </div>
    );
  }

  return (

    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-16">

        <h1 className="text-4xl font-bold mb-10">

          Available Properties

        </h1>

        {properties.length === 0 ? (

          <h2 className="text-xl text-gray-500">

            No properties found

          </h2>

        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            {properties.map(
              (property) => (

                <div
                  key={
                    property._id
                  }
                  className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition"
                >

                  {/* PROPERTY IMAGE */}

                  <img
                    src={
                      property.image
                        ? property.image
                        : "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                    }
                    alt="property"
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">

                    <h2 className="text-2xl font-bold mb-2">

                      {
                        property.title
                      }

                    </h2>

                    <p className="text-gray-500 mb-2">

                      {
                        property.location
                      }

                    </p>

                    <p className="text-sm text-gray-400 mb-2">

                      {
                        property.type
                      }

                    </p>

                    <p className="text-green-600 text-2xl font-bold mb-5">

                      ₹ {
                        property.price
                      }

                    </p>

                    {/* BUTTONS */}

                    <div className="flex flex-wrap gap-3">

                      {/* VIEW DETAILS */}

                      <button
                        onClick={() =>
                          navigate(
                            `/property/${property._id}`
                          )
                        }
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                      >

                        View Details

                      </button>

                      {/* ONLY ADMIN */}

                      {
                        user?.role ===
                          "admin" && (

                          <>

                            {/* EDIT */}

                            <button
                              onClick={() =>
                                navigate(
                                  `/edit-property/${property._id}`
                                )
                              }
                              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                            >

                              Edit

                            </button>

                            {/* DELETE */}

                            <button
                              onClick={() =>
                                handleDelete(
                                  property._id
                                )
                              }
                              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                            >

                              Delete

                            </button>

                          </>
                        )
                      }

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

      <Footer />

    </div>
  );
};

export default Properties;