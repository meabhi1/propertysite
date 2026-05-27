import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PropertyDetails = () => {

  const { id } = useParams();

  const [property, setProperty] =
    useState(null);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/property/${id}`
      );

      setProperty(res.data.property);

    } catch (error) {

      console.log(error);
    }
  };

  if (!property) {

    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const whatsappNumber =
    "919999999999";

  const whatsappMessage =
    `Hello, I am interested in ${property.title}`;

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  return (

    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-5 py-16">

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-10">

          <img
            src={property.image}
            alt="property"
            className="w-full h-full object-cover min-h-[500px]"
          />

          <div className="p-8">

            <h1 className="text-4xl font-bold mb-5">
              {property.title}
            </h1>

            <h2 className="text-3xl text-green-600 font-semibold mb-4">
              ₹ {property.price}
            </h2>

            <p className="text-lg mb-3">
              <strong>Location:</strong>{" "}
              {property.location}
            </p>

            <p className="text-lg mb-3">
              <strong>Type:</strong>{" "}
              {property.type}
            </p>

            <p className="text-gray-600 leading-8 mb-8">
              {property.description}
            </p>

            <a
              href={whatsappURL}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg transition"
            >
              Book Now
            </a>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default PropertyDetails;