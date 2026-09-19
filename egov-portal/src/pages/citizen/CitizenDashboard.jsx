import "./CitizenDashboard.css";
import { Link } from "react-router-dom";

function CitizenDashboard() {
  return (
    <div className="citizen-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          E-Governance
        </div>

        <nav className="sidebar-nav">

          <a href="#" className="active">
            Dashboard
          </a>

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

        <button className="logout-btn">
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        {/* Topbar */}
        <header className="dashboard-header">

          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Citizen</p>
          </div>

          <div className="user-info">
            <div className="user-avatar">
              C
            </div>

            <span>Citizen</span>
          </div>

        </header>


        {/* Dashboard Content */}
        <section className="dashboard-content">

          <h2>Overview</h2>


          {/* Statistics */}
          <div className="stats-container">

            <div className="stat-card">
              <h3>Total Complaints</h3>
              <p>5</p>
            </div>

            <div className="stat-card">
              <h3>Pending</h3>
              <p>2</p>
            </div>

            <div className="stat-card">
              <h3>In Progress</h3>
              <p>1</p>
            </div>

            <div className="stat-card">
              <h3>Resolved</h3>
              <p>2</p>
            </div>

          </div>


          {/* Recent Complaints */}
          <div className="recent-section">

            <div className="section-title">
              <h2>Recent Complaints</h2>

              <button>
                View All
              </button>
            </div>


            <div className="complaint-table">

              <div className="table-header">
                <span>Complaint</span>
                <span>Department</span>
                <span>Date</span>
                <span>Status</span>
              </div>


              <div className="table-row">

                <span>Road Damage</span>

                <span>Public Works</span>

                <span>18 Aug 2026</span>

                <span className="status pending">
                  Pending
                </span>

              </div>


              <div className="table-row">

                <span>Water Supply Issue</span>

                <span>Water Department</span>

                <span>15 Aug 2026</span>

                <span className="status resolved">
                  Resolved
                </span>

              </div>


              <div className="table-row">

                <span>Street Light</span>

                <span>Electricity</span>

                <span>12 Aug 2026</span>

                <span className="status progress">
                  In Progress
                </span>

              </div>

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

            <button>
              Submit Complaint
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CitizenDashboard;