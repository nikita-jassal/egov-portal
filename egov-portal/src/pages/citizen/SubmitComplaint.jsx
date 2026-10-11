
import { useState } from "react";
import "./SubmitComplaint.css";

function SubmitComplaint() {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Login ke time save hua JWT token
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/complaints",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: title,
            department: department,
            location: location,
            description: description,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Complaint submitted successfully!");

        // Form clear
        setTitle("");
        setDepartment("");
        setLocation("");
        setDescription("");
      } else {
        alert(data.message || "Complaint submission failed");
      }
    } catch (error) {
      console.error("Complaint error:", error);
      alert("Server se connection nahi ho pa raha");
    }
  };

  return (
    <div className="complaint-page">

      <div className="complaint-box">

        <h1>Submit Complaint</h1>

        <p>
          Please provide details about your complaint.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Complaint Title</label>

            <input
              type="text"
              placeholder="Enter complaint title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="Public Works">
                Public Works
              </option>
              <option value="Water Department">
                Water Department
              </option>
              <option value="Electricity">
                Electricity
              </option>
              <option value="Health Department">
                Health Department
              </option>
              <option value="Education Department">
                Education Department
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Describe your complaint"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">
            Submit Complaint
          </button>

        </form>

      </div>

    </div>
  );
}

export default SubmitComplaint;

