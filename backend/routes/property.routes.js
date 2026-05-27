const express = require("express");

const router = express.Router();

const {
  createProperty,
  getAllProperties,
  getSingleProperty,
  deleteProperty,
  updateProperty,
} = require(
  "../controllers/property.controller"
);

const {
  isAuthenticated,
} = require(
  "../middleware/auth.middleware"
);

const {
  isAdmin,
} = require(
  "../middleware/admin.middleware"
);

const upload = require(
  "../middleware/upload.middleware"
);

// ONLY ADMIN CAN CREATE
router.post(
  "/create",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createProperty
);

// PUBLIC ROUTES
router.get(
  "/all",
  getAllProperties
);

router.get(
  "/:id",
  getSingleProperty
);

// ONLY ADMIN CAN UPDATE
router.put(
  "/update/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateProperty
);

// ONLY ADMIN CAN DELETE
router.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin,
  deleteProperty
);

module.exports = router;