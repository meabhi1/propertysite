import React, {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

const CreateProperty = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      price: "",
      location: "",
      type: "",
      description: "",
    });

  const [image, setImage] =
    useState(null);

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const submitHandler = async (
    e
  ) => {

    e.preventDefault();

    // LOADING TOAST
    const toastId =
      toast.loading(
        "Creating Property..."
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

      data.append(
        "image",
        image
      );

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        "http://localhost:5000/api/property/create",
        data,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      // SUCCESS TOAST
      toast.success(
        "Property Added Successfully",
        {
          id: toastId,
        }
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      // ERROR TOAST
      toast.error(
        error.response?.data
          ?.message ||
        "Error Creating Property",
        {
          id: toastId,
        }
      );
    }
  };

  return (

    <div className="container mt-5">

      <h2>
        Create Property
      </h2>

      <form onSubmit={submitHandler}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control mb-3"
          onChange={changeHandler}
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          className="form-control mb-3"
          onChange={changeHandler}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="form-control mb-3"
          onChange={changeHandler}
        />

        <input
          type="text"
          name="type"
          placeholder="Type"
          className="form-control mb-3"
          onChange={changeHandler}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          onChange={changeHandler}
        />

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        <button className="btn btn-primary">

          Add Property

        </button>

      </form>

    </div>
  );
};

export default CreateProperty;