
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [analytics, setAnalytics] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setAdmin(JSON.parse(savedUser));
    }

    fetchAnalytics();
    fetchComplaints();
  }, []);

  // Fetch analytics
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

  // Fetch all complaints
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
        console.log(data.message);
      }
    } catch (error) {
      console.error("Complaints error:", error);
    }
  };

  // Recent 3 complaints
  const recentComplaints = complaints.slice(0, 3);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  // Date format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <h2>E-Governance</h2>

        <nav>
          <Link
            to="/admin/dashboard"
            className="active"
          >
            Dashboard
          </Link>

          <Link to="/admin/complaints">
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
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">

          <div>
            <h1>Admin Dashboard</h1>

            <p>
              Welcome back,{" "}
              {admin ? admin.name : "Admin"}
            </p>
          </div>

          <div className="admin-user">
            {admin ? admin.name : "Admin"}
          </div>

        </header>


        {/* Dashboard Content */}
        <section className="admin-content">

          {/* Statistics */}
          <div className="admin-stats">

            <div className="admin-stat">
              <span>Total Complaints</span>
              <strong>{analytics.total}</strong>
            </div>

            <div className="admin-stat">
              <span>Pending</span>
              <strong>{analytics.pending}</strong>
            </div>

            <div className="admin-stat">
              <span>In Progress</span>
              <strong>{analytics.inProgress}</strong>
            </div>

            <div className="admin-stat">
              <span>Resolved</span>
              <strong>{analytics.resolved}</strong>
            </div>

          </div>


          {/* Recent Complaints */}
          <div className="recent-complaints">

            <div className="section-header">

              <h2>Recent Complaints</h2>

              <Link to="/admin/complaints">
                <button>
                  View All
                </button>
              </Link>

            </div>


            <div className="complaint-list">

              {recentComplaints.length === 0 ? (

                <p>No complaints found.</p>

              ) : (

                recentComplaints.map((complaint) => (

                  <div
                    className="complaint-row"
                    key={complaint._id}
                  >

                    <span>
                      {complaint.title}
                    </span>

                    <span>
                      {complaint.department}
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

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;

