
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CitizenDashboard.css";

function CitizenDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // LocalStorage se user information
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
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
        console.log(data.message);
      }
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  // Complaint counts
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  // Recent 3 complaints
  const recentComplaints = complaints.slice(0, 3);

  // Date format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="citizen-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          E-Governance
        </div>

        <nav className="sidebar-nav">

          <Link to="/citizen/dashboard" className="active">
            Dashboard
          </Link>

          <Link to="/citizen/submit-complaint">
            Submit Complaint
          </Link>

          <Link to="/citizen/my-complaints">
            My Complaints
          </Link>

          <a href="#">
            Profile
          </a>

        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        {/* Topbar */}
        <header className="dashboard-header">

          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back,{" "}
              {user ? user.name : "Citizen"}
            </p>
          </div>

          <div className="user-info">

            <div className="user-avatar">
              {user
                ? user.name.charAt(0).toUpperCase()
                : "C"}
            </div>

            <span>
              {user ? user.name : "Citizen"}
            </span>

          </div>

        </header>


        {/* Dashboard Content */}
        <section className="dashboard-content">

          <h2>Overview</h2>


          {/* Statistics */}
          <div className="stats-container">

            <div className="stat-card">
              <h3>Total Complaints</h3>
              <p>{totalComplaints}</p>
            </div>

            <div className="stat-card">
              <h3>Pending</h3>
              <p>{pendingComplaints}</p>
            </div>

            <div className="stat-card">
              <h3>In Progress</h3>
              <p>{inProgressComplaints}</p>
            </div>

            <div className="stat-card">
              <h3>Resolved</h3>
              <p>{resolvedComplaints}</p>
            </div>

          </div>


          {/* Recent Complaints */}
          <div className="recent-section">

            <div className="section-title">

              <h2>Recent Complaints</h2>

              <Link to="/citizen/my-complaints">
                <button>
                  View All
                </button>
              </Link>

            </div>


            <div className="complaint-table">

              <div className="table-header">
                <span>Complaint</span>
                <span>Department</span>
                <span>Date</span>
                <span>Status</span>
              </div>


              {recentComplaints.length === 0 ? (

                <div className="table-row">
                  <span>No complaints yet.</span>
                </div>

              ) : (

                recentComplaints.map((complaint) => (

                  <div
                    className="table-row"
                    key={complaint._id}
                  >

                    <span>
                      {complaint.title}
                    </span>

                    <span>
                      {complaint.department}
                    </span>

                    <span>
                      {formatDate(complaint.createdAt)}
                    </span>

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

                ))

              )}

            </div>

          </div>


          {/* Quick Action */}
          <div className="quick-action">

            <div>
              <h2>Have a problem?</h2>

              <p>
                Submit a complaint and let the concerned
                department know about your issue.
              </p>
            </div>

            <Link to="/citizen/submit-complaint">
              <button>
                Submit Complaint
              </button>
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CitizenDashboard;

