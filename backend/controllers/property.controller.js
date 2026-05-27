const Property = require(
  "../models/property.model"
);

// CREATE PROPERTY
exports.createProperty = async (
  req,
  res
) => {

  try {

    const {
      title,
      price,
      location,
      type,
      description,
    } = req.body;

    const property =
      await Property.create({

        title,
        price,
        location,
        type,
        description,

        image: req.file
          ? `http://localhost:5000/uploads/${req.file.filename}`
          : "",

        owner: req.id,
      });

    return res.status(201).json({
      success: true,
      message:
        "Property Added Successfully",
      property,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PROPERTIES
exports.getAllProperties = async (
  req,
  res
) => {

  try {

    const properties =
      await Property.find({});

    return res.status(200).json({
      success: true,
      properties,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PROPERTY
exports.getSingleProperty = async (
  req,
  res
) => {

  try {

    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({
        success: false,
        message:
          "Property Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      property,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PROPERTY
exports.updateProperty = async (
  req,
  res
) => {

  try {

    const {
      title,
      price,
      location,
      type,
      description,
    } = req.body;

    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({
        success: false,
        message:
          "Property not found",
      });
    }

    property.title = title;
    property.price = price;
    property.location =
      location;
    property.type = type;
    property.description =
      description;

    // UPDATE IMAGE
    if (req.file) {

      property.image =
        `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await property.save();

    return res.status(200).json({
      success: true,
      message:
        "Property updated successfully",
      property,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PROPERTY
exports.deleteProperty = async (
  req,
  res
) => {

  try {

    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({
        success: false,
        message:
          "Property not found",
      });
    }

    await Property.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Property deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};