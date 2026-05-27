const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// STATIC FOLDER FOR IMAGES
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ROUTES
app.use(
  "/api/auth",
  require("./routes/auth.routes")
);

app.use(
  "/api/property",
  require("./routes/property.routes")
);

app.use(
  "/api/booking",
  require("./routes/booking.routes")
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ERROR MIDDLEWARE
const errorMiddleware = require(
  "./middleware/error.middleware"
);

app.use(errorMiddleware);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});