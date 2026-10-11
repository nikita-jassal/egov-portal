const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();


// ==================== MIDDLEWARE ====================

app.use(cors());

app.use(express.json());


// ==================== TEST ROUTE ====================

app.get("/", (req, res) => {
  res.send("E-Governance Backend is ready");
});


// ==================== API ROUTES ====================

app.use("/api/users", userRoutes);

app.use("/api/complaints", complaintRoutes);


// ==================== DATABASE ====================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });