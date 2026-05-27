import {
  useState,
} from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const whatsappNumber =
      "919999999999";

    const text =
      `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${text}`,
      "_blank"
    );
  };

  return (

    <div>

      <Navbar />

      <section className="max-w-4xl mx-auto px-5 py-20">

        <h1 className="text-5xl font-bold mb-10">
          Contact Us
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl p-10 rounded-2xl"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-5"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-5"
            required
          />

          <textarea
            rows="6"
            name="message"
            placeholder="Message"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-5"
            required
          ></textarea>

          <button className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700">

            Send Message

          </button>

        </form>

      </section>

      <Footer />

    </div>
  );
};

export default Contact;