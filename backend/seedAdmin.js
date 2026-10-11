const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const User = require("./models/user");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({
      email: "admin@egov.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    const admin = new User({
      name: "E-Governance Admin",
      email: "admin@egov.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Admin created successfully");
    console.log("Email: admin@egov.com");
    console.log("Password: admin123");

    process.exit();

  } catch (error) {
    console.log("Error creating admin");
    console.log(error.message);

    process.exit(1);
  }
};

createAdmin();