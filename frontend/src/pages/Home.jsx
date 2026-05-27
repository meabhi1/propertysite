import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import API from "../utils/api";

const Home = () => {

  const navigate = useNavigate();

  const [properties, setProperties] =
    useState([]);

  useEffect(() => {

    fetchProperties();

  }, []);

  const fetchProperties = async () => {

    try {

      const res = await API.get(
        "/property/all"
      );

      setProperties(
        res.data.properties
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div>

      <Navbar />

      <Hero />

      {/* PROPERTY SECTION */}
      <section className="max-w-7xl mx-auto px-5 py-20">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold">

              Featured Properties

            </h1>

            <p className="text-gray-600 mt-2">

              Explore best rental properties

            </p>

          </div>

          <button
            onClick={() =>
              navigate("/properties")
            }
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >

            View All

          </button>

        </div>

        {/* DYNAMIC PROPERTIES */}

        {properties.length === 0 ? (

          <h2 className="text-xl text-gray-500">

            No properties available

          </h2>

        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            {properties
              .slice(0, 6)
              .map((property) => (

                <div
                  key={property._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >

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

                      {property.title}

                    </h2>

                    <p className="text-gray-500 mb-2">

                      {property.location}

                    </p>

                    <p className="text-green-600 text-xl font-bold mb-3">

                      ₹ {property.price}

                    </p>

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

                  </div>

                </div>
              ))}

          </div>
        )}

      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-5">

          <h1 className="text-4xl font-bold text-center mb-14">

            Why Choose Us

          </h1>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">

              <h2 className="text-2xl font-bold mb-4">

                Zero Brokerage

              </h2>

              <p className="text-gray-600">

                Connect directly with owners and save brokerage fees.

              </p>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">

              <h2 className="text-2xl font-bold mb-4">

                Verified Listings

              </h2>

              <p className="text-gray-600">

                Genuine and trusted properties with complete verification.

              </p>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">

              <h2 className="text-2xl font-bold mb-4">

                Easy Booking

              </h2>

              <p className="text-gray-600">

                Smooth and fast property booking experience.

              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default Home;