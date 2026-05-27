import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <section className="max-w-7xl mx-auto px-5 py-16">

        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Total Properties
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-5">
              24
            </p>
          </div>

          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Total Users
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-5">
              120
            </p>
          </div>

          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Bookings
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-5">
              54
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;