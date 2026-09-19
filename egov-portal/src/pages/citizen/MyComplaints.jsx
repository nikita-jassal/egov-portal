import { Link } from "react-router-dom";
import "./MyComplaints.css";

function MyComplaints() {
  return (
    <div className="my-complaints-page">

      <div className="complaints-container">

        <div className="complaints-header">
          <div>
            <h1>My Complaints</h1>
            <p>View and track your submitted complaints.</p>
          </div>

          <Link
            to="/citizen/submit-complaint"
            className="new-complaint-btn"
          >
            + New Complaint
          </Link>
        </div>


        <div className="complaints-list">

          {/* Complaint 1 */}
          <div className="complaint-card">

            <div className="complaint-info">
              <h2>Road Damage</h2>

              <p>
                <strong>Department:</strong> Public Works
              </p>

              <p>
                <strong>Location:</strong> Main Road
              </p>

              <p>
                <strong>Date:</strong> 21 Aug 2026
              </p>
            </div>

            <div className="complaint-status">
              <span className="status pending">
                Pending
              </span>

              <Link to="#">
                View Details
              </Link>
            </div>

          </div>


          {/* Complaint 2 */}
          <div className="complaint-card">

            <div className="complaint-info">
              <h2>Water Supply Issue</h2>

              <p>
                <strong>Department:</strong> Water Department
              </p>

              <p>
                <strong>Location:</strong> Sector 5
              </p>

              <p>
                <strong>Date:</strong> 18 Aug 2026
              </p>
            </div>

            <div className="complaint-status">
              <span className="status progress">
                In Progress
              </span>

              <Link to="#">
                View Details
              </Link>
            </div>

          </div>


          {/* Complaint 3 */}
          <div className="complaint-card">

            <div className="complaint-info">
              <h2>Street Light</h2>

              <p>
                <strong>Department:</strong> Electricity
              </p>

              <p>
                <strong>Location:</strong> Near Market
              </p>

              <p>
                <strong>Date:</strong> 15 Aug 2026
              </p>
            </div>

            <div className="complaint-status">
              <span className="status resolved">
                Resolved
              </span>

              <Link to="#">
                View Details
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyComplaints;