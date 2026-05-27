const express = require(
  "express"
);

const router =
  express.Router();

const {

  createProperty,
  getAllProperties,
  getSingleProperty,

} = require(
  "../controllers/property.controller"
);

const {

  isAuthenticated,

} = require(
  "../middleware/auth.middleware"
);

router.post(
  "/create",
  isAuthenticated,
  createProperty
);

router.get(
  "/all",
  getAllProperties
);

router.get(
  "/:id",
  getSingleProperty
);

module.exports = router;