import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />

      <section className="max-w-6xl mx-auto px-5 py-20">

        <h1 className="text-5xl font-bold mb-8">
          About Us
        </h1>

        <p className="text-lg text-gray-700 leading-9">
          We help people find homes without
          brokerage fees by connecting tenants
          directly with owners.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default About;