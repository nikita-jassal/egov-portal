const express = require("express");

const Complaint = require("../models/complaint");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==================================================
// CITIZEN - SUBMIT COMPLAINT
// ==================================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "citizen") {
      return res.status(403).json({
        message: "Only citizens can submit complaints",
      });
    }

    const {
      title,
      department,
      location,
      description,
    } = req.body;

    if (!title || !location || !description) {
      return res.status(400).json({
        message: "Title, location and description are required",
      });
    }

    const complaint = new Complaint({
      title,
      department: department || "Not Assigned",
      location,
      description,
      citizen: req.user.id,
      status: "Pending",
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==================================================
// CITIZEN - MY COMPLAINTS
// ==================================================

router.get("/my", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "citizen") {
      return res.status(403).json({
        message: "Only citizens can access this",
      });
    }

    const complaints = await Complaint.find({
      citizen: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==================================================
// ADMIN - ALL COMPLAINTS
// ==================================================

router.get("/all", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can access all complaints",
      });
    }

    const complaints = await Complaint.find()
      .populate("citizen", "name email")
      .sort({
        createdAt: -1,
      });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==================================================
// ADMIN - ASSIGN DEPARTMENT
// ==================================================

router.put("/:id/department", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can assign department",
      });
    }

    const { department } = req.body;

    const allowedDepartments = [
      "Public Works",
      "Water Department",
      "Electricity",
      "Health Department",
      "Education Department",
    ];

    if (!allowedDepartments.includes(department)) {
      return res.status(400).json({
        message: "Invalid department",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        department,
      },
      {
        new: true,
      }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.json({
      message: "Department updated successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==================================================
// ADMIN - UPDATE STATUS
// ==================================================

router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can update status",
      });
    }

    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Progress",
      "Resolved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.json({
      message: "Status updated successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==================================================
// ADMIN - ANALYTICS
// ==================================================

router.get("/analytics", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can access analytics",
      });
    }

    const total = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    res.json({
      total,
      pending,
      inProgress,
      resolved,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


module.exports = router;