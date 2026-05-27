import { useNavigate } from "react-router-dom";

const PropertyCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

      <img
        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
        alt="property"
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2">
          Luxury Apartment
        </h2>

        <p className="text-gray-600 mb-3">
          Mumbai, Maharashtra
        </p>

        <div className="flex items-center justify-between">
          <h3 className="text-green-600 text-2xl font-bold">
            ₹25,000
          </h3>

          <button
            onClick={() => navigate("/property/1")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;