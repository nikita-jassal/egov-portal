
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyComplaints.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/complaints/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setComplaints(data);
      } else {
        alert(data.message || "Failed to load complaints");
      }
    } catch (error) {
      console.error("Fetch complaints error:", error);
      alert("Server se connection nahi ho pa raha");
    } finally {
      setLoading(false);
    }
  };

  // Date ko simple format mein show karne ke liye
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="my-complaints-page">

      <div className="complaints-container">

        <div className="complaints-header">
          <div>
            <h1>My Complaints</h1>
            <p>
              View and track your submitted complaints.
            </p>
          </div>

          <Link
            to="/citizen/submit-complaint"
            className="new-complaint-btn"
          >
            + New Complaint
          </Link>
        </div>

        <div className="complaints-list">

          {loading ? (
            <p>Loading complaints...</p>
          ) : complaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            complaints.map((complaint) => (

              <div
                className="complaint-card"
                key={complaint._id}
              >

                <div className="complaint-info">

                  <h2>{complaint.title}</h2>

                  <p>
                    <strong>Department:</strong>{" "}
                    {complaint.department}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {complaint.location}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {formatDate(complaint.createdAt)}
                  </p>

                </div>

                <div className="complaint-status">

                  <span
                    className={`status ${
                      complaint.status === "Pending"
                        ? "pending"
                        : complaint.status === "In Progress"
                        ? "progress"
                        : "resolved"
                    }`}
                  >
                    {complaint.status}
                  </span>

                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default MyComplaints;

