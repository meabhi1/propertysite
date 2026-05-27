import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {

  return (
    <div className="card shadow p-2">

      <img
        src={property.image}
        alt="property"
        height="250px"
        style={{ objectFit: "cover" }}
      />

      <div className="card-body">

        <h4>{property.title}</h4>

        <h5>₹ {property.price}</h5>

        <p>{property.location}</p>

        <Link
          to={`/property/${property._id}`}
          className="btn btn-dark"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default PropertyCard;