import "./AdminDashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <h2>E-Governance</h2>

        <nav>
          <Link to="/admin/dashboard" className="active">
            Dashboard
          </Link>

          <Link to="/admin/complaints">
            All Complaints
          </Link>
        </nav>

        <button className="admin-logout">
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">

          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage citizen complaints</p>
          </div>

          <div className="admin-user">
            Admin
          </div>

        </header>


        {/* Dashboard Content */}
        <section className="admin-content">

          {/* Statistics */}
          <div className="admin-stats">

            <div className="admin-stat">
              <span>Total Complaints</span>
              <strong>50</strong>
            </div>

            <div className="admin-stat">
              <span>Pending</span>
              <strong>20</strong>
            </div>

            <div className="admin-stat">
              <span>In Progress</span>
              <strong>15</strong>
            </div>

            <div className="admin-stat">
              <span>Resolved</span>
              <strong>15</strong>
            </div>

          </div>


          {/* Recent Complaints */}
          <div className="recent-complaints">

            <div className="section-header">

              <h2>Recent Complaints</h2>

              <button>
                View All
              </button>

            </div>


            <div className="complaint-list">

              <div className="complaint-row">

                <span>Road Damage</span>

                <span>Public Works</span>

                <span className="status pending">
                  Pending
                </span>

              </div>


              <div className="complaint-row">

                <span>Water Supply</span>

                <span>Water Department</span>

                <span className="status progress">
                  In Progress
                </span>

              </div>


              <div className="complaint-row">

                <span>Street Light</span>

                <span>Electricity</span>

                <span className="status resolved">
                  Resolved
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;