import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../utils/api";

import toast from "react-hot-toast";

const EditProperty = () => {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      price: "",
      location: "",
      type: "",
      description: "",
    });

  useEffect(() => {

    fetchProperty();

  }, []);

  const fetchProperty =
    async () => {

      try {

        const res =
          await API.get(
            `/property/${id}`
          );

        setFormData(
          res.data.property
        );

        setPreview(
          res.data.property.image
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed To Load Property"
        );
      }
    };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      // LOADING TOAST
      const toastId =
        toast.loading(
          "Updating Property..."
        );

      try {

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

        if (image) {

          data.append(
            "image",
            image
          );
        }

        const res =
          await API.put(
            `/property/update/${id}`,
            data
          );

        // SUCCESS TOAST
        toast.success(
          res.data.message ||
          "Property Updated Successfully",
          {
            id: toastId,
          }
        );

        navigate(
          "/properties"
        );

      } catch (error) {

        console.log(error);

        // ERROR TOAST
        toast.error(
          error.response?.data
            ?.message ||
          "Failed To Update Property",
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
          onSubmit={
            handleSubmit
          }
          className="bg-white shadow-2xl rounded-2xl p-10"
        >

          <h1 className="text-4xl font-bold mb-10">

            Edit Property

          </h1>

          <div className="grid md:grid-cols-2 gap-5">

            {/* TITLE */}

            <div>

              <label className="block mb-2 font-semibold">

                Property Title

              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                placeholder="Enter property title"
                className="w-full border p-3 rounded-lg"
                required
              />

            </div>

            {/* PRICE */}

            <div>

              <label className="block mb-2 font-semibold">

                Price

              </label>

              <input
                type="number"
                name="price"
                value={
                  formData.price
                }
                onChange={
                  handleChange
                }
                placeholder="Enter property price"
                className="w-full border p-3 rounded-lg"
                required
              />

            </div>

            {/* LOCATION */}

            <div>

              <label className="block mb-2 font-semibold">

                Location

              </label>

              <input
                type="text"
                name="location"
                value={
                  formData.location
                }
                onChange={
                  handleChange
                }
                placeholder="Enter location"
                className="w-full border p-3 rounded-lg"
                required
              />

            </div>

            {/* TYPE */}

            <div>

              <label className="block mb-2 font-semibold">

                Property Type

              </label>

              <select
                name="type"
                value={
                  formData.type
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded-lg"
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

          </div>

          {/* DESCRIPTION */}

          <div className="mt-5">

            <label className="block mb-2 font-semibold">

              Description

            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              placeholder="Enter property description"
              rows="6"
              className="w-full border p-3 rounded-lg"
            ></textarea>

          </div>

          {/* IMAGE */}

          <div className="mt-5">

            <label className="block mb-2 font-semibold">

              Update Property Image

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImage
              }
              className="w-full border p-3 rounded-lg"
            />

          </div>

          {/* IMAGE PREVIEW */}

          {
            preview && (

              <img
                src={preview}
                alt="preview"
                className="mt-5 h-72 w-full object-cover rounded-2xl"
              />
            )
          }

          {/* BUTTON */}

          <button
            type="submit"
            className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition"
          >

            Update Property

          </button>

        </form>

      </div>

      <Footer />

    </div>
  );
};

export default EditProperty;