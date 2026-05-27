import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../utils/api";

import toast from "react-hot-toast";

const AddProperty = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      title: "",
      price: "",
      location: "",
      type: "Flat",
      description: "",
    });

  // IMAGE STATE
  const [image, setImage] =
    useState(null);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // IMAGE HANDLER
  const handleImage = (e) => {

    setImage(
      e.target.files[0]
    );
  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    // LOADING TOAST
    const toastId =
      toast.loading(
        "Uploading Property..."
      );

    try {

      // FORMDATA
      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "location",
        formData.location
      );

      data.append(
        "type",
        formData.type
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "image",
        image
      );

      const res = await API.post(
        "/property/create",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      // SUCCESS TOAST
      toast.success(
        res.data.message ||
        "Property Added Successfully",
        {
          id: toastId,
        }
      );

      navigate("/properties");

    } catch (error) {

      console.log(error);

      // ERROR TOAST
      toast.error(
        error.response?.data?.message ||
        "Failed To Add Property",
        {
          id: toastId,
        }
      );
    }
  };

  return (

    <div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-5 py-16">

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-10"
        >

          <h1 className="text-4xl font-bold mb-10">

            Add Property

          </h1>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Property Title"
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="border p-3 rounded-lg"
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >

              <option value="Flat">

                Flat

              </option>

              <option value="House">

                House

              </option>

              <option value="PG">

                PG

              </option>

              <option value="Office">

                Office

              </option>

            </select>

          </div>

          {/* IMAGE INPUT */}

          <div className="mt-5">

            <label className="block mb-2 font-semibold">

              Upload Property Image

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="border p-3 rounded-lg w-full"
            />

          </div>

          {/* IMAGE PREVIEW */}

          {image && (

            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="mt-5 h-64 w-full object-cover rounded-xl"
            />

          )}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="6"
            className="w-full border p-3 rounded-lg mt-5"
          ></textarea>

          <button
            type="submit"
            className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition"
          >

            Add Property

          </button>

        </form>

      </div>

      <Footer />

    </div>
  );
};

export default AddProperty;