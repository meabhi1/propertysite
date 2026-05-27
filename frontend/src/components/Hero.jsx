import {
  useNavigate,
} from "react-router-dom";

const Hero = () => {

  const navigate =
    useNavigate();

  // GET USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">

      <div className="max-w-7xl mx-auto px-5 py-24 grid md:grid-cols-2 gap-10 items-center">

        <div>

          <h1 className="text-5xl font-bold leading-tight mb-6">

            Find Your Perfect Home Without Brokerage

          </h1>

          <p className="text-lg mb-8 text-gray-100">

            Buy, Rent and Sell properties directly
            from owners without paying extra brokerage.

          </p>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate("/properties")
              }
              className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
            >
              Explore Properties
            </button>

            {/* ONLY ADMIN CAN SEE */}

            {
              user?.role === "admin" && (

                <button
                  onClick={() =>
                    navigate(
                      "/add-property"
                    )
                  }
                  className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600"
                >
                  Post Property
                </button>
              )
            }

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
            alt="home"
            className="rounded-3xl shadow-2xl"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;