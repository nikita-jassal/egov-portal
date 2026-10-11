
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllComplaints.css";

function AllComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [analytics, setAnalytics] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  // Load complaints and analytics
  useEffect(() => {
    fetchComplaints();
    fetchAnalytics();
  }, []);

  // Get all complaints
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/complaints/all",
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
      console.error("Complaints error:", error);
    }
  };

  // Get analytics
  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/complaints/analytics",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAnalytics(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Analytics error:", error);
    }
  };

  // Change department
  const handleDepartmentChange = async (
    id,
    newDepartment
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/complaints/${id}/department`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            department: newDepartment,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Screen par bhi update karo
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === id
              ? {
                  ...complaint,
                  department: newDepartment,
                }
              : complaint
          )
        );

        alert("Department updated successfully");
      } else {
        alert(data.message || "Department update failed");
      }
    } catch (error) {
      console.error("Department error:", error);
      alert("Server se connection nahi ho pa raha");
    }
  };

  // Change status
  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/complaints/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Screen par update karo
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === id
              ? {
                  ...complaint,
                  status: newStatus,
                }
              : complaint
          )
        );

        // Analytics bhi refresh karo
        fetchAnalytics();

        alert("Status updated successfully");
      } else {
        alert(data.message || "Status update failed");
      }
    } catch (error) {
      console.error("Status error:", error);
      alert("Server se connection nahi ho pa raha");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="all-complaints-page">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <h2>E-Governance</h2>

        <nav>

          <Link to="/admin/dashboard">
            Dashboard
          </Link>

          <Link
            to="/admin/complaints"
            className="active"
          >
            All Complaints
          </Link>

        </nav>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main className="complaints-main">

        {/* Header */}
        <header className="complaints-header">

          <div>
            <h1>All Complaints</h1>

            <p>
              Manage citizen complaints and update their status
            </p>
          </div>

          <div className="admin-user">
            Admin
          </div>

        </header>


        <section className="complaints-content">

          {/* Analytics */}
          <div className="analytics-section">

            <h2>Analytics</h2>

            <div className="analytics-cards">

              <div className="analytics-card">
                <span>Total Complaints</span>
                <strong>{analytics.total}</strong>
              </div>

              <div className="analytics-card">
                <span>Pending</span>
                <strong>{analytics.pending}</strong>
              </div>

              <div className="analytics-card">
                <span>In Progress</span>
                <strong>{analytics.inProgress}</strong>
              </div>

              <div className="analytics-card">
                <span>Resolved</span>
                <strong>{analytics.resolved}</strong>
              </div>

            </div>


            {/* Analytics Bars */}
            <div className="analytics-bar-box">

              {/* Pending */}
              <div className="bar-item">

                <div className="bar-label">
                  <span>Pending</span>
                  <span>{analytics.pending}</span>
                </div>

                <div className="bar-background">

                  <div
                    className="bar pending-bar"
                    style={{
                      width: `${
                        analytics.total
                          ? (analytics.pending /
                              analytics.total) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>


              {/* In Progress */}
              <div className="bar-item">

                <div className="bar-label">
                  <span>In Progress</span>
                  <span>{analytics.inProgress}</span>
                </div>

                <div className="bar-background">

                  <div
                    className="bar progress-bar"
                    style={{
                      width: `${
                        analytics.total
                          ? (analytics.inProgress /
                              analytics.total) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>


              {/* Resolved */}
              <div className="bar-item">

                <div className="bar-label">
                  <span>Resolved</span>
                  <span>{analytics.resolved}</span>
                </div>

                <div className="bar-background">

                  <div
                    className="bar resolved-bar"
                    style={{
                      width: `${
                        analytics.total
                          ? (analytics.resolved /
                              analytics.total) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>


          {/* Complaints Table */}
          <div className="complaints-table-section">

            <div className="table-heading">

              <h2>Complaint List</h2>

              <span>
                {analytics.total} Complaints
              </span>

            </div>


            <div className="table-container">

              <table>

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Complaint</th>
                    <th>Citizen</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>

                </thead>


                <tbody>

                  {complaints.length === 0 ? (

                    <tr>
                      <td colSpan="5">
                        No complaints found.
                      </td>
                    </tr>

                  ) : (

                    complaints.map((complaint, index) => (

                      <tr key={complaint._id}>

                        <td>
                          #{index + 1}
                        </td>

                        <td className="complaint-title">
                          {complaint.title}
                        </td>

                        <td>
                          {complaint.citizen
                            ? complaint.citizen.name
                            : "Unknown"}
                        </td>


                        {/* Department */}
                        <td>

                          <select
                            value={
                              complaint.department ===
                              "Not Assigned"
                                ? ""
                                : complaint.department
                            }
                            onChange={(e) =>
                              handleDepartmentChange(
                                complaint._id,
                                e.target.value
                              )
                            }
                            className="department-select"
                          >

                            <option value="">
                              Select Department
                            </option>

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

                        </td>


                        {/* Status */}
                        <td>

                          <select
                            value={complaint.status}
                            onChange={(e) =>
                              handleStatusChange(
                                complaint._id,
                                e.target.value
                              )
                            }
                            className={`status-select ${
                              complaint.status ===
                              "Pending"
                                ? "status-pending"
                                : complaint.status ===
                                  "In Progress"
                                ? "status-progress"
                                : "status-resolved"
                            }`}
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Resolved">
                              Resolved
                            </option>

                          </select>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AllComplaints;

