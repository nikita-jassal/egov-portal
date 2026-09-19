import { useState } from "react";
import "./AllComplaints.css";

function AllComplaints() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Road Damage",
      citizen: "Rahul Sharma",
      department: "Public Works",
      status: "Pending",
    },
    {
      id: 2,
      title: "Water Supply Problem",
      citizen: "Priya Singh",
      department: "Water Department",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Street Light Not Working",
      citizen: "Amit Kumar",
      department: "Electricity",
      status: "Resolved",
    },
    {
      id: 4,
      title: "Hospital Cleanliness",
      citizen: "Neha Verma",
      department: "Health Department",
      status: "Pending",
    },
    {
      id: 5,
      title: "School Infrastructure",
      citizen: "Rohit Kumar",
      department: "Education Department",
      status: "In Progress",
    },
  ]);

  // Change department
  const handleDepartmentChange = (id, newDepartment) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, department: newDepartment }
          : complaint
      )
    );
  };

  // Change status
  const handleStatusChange = (id, newStatus) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status: newStatus }
          : complaint
      )
    );
  };

  // Analytics
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const progressComplaints = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  return (
    <div className="all-complaints-page">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>E-Governance</h2>

        <nav>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/complaints" className="active">
            All Complaints
          </a>
        </nav>

        <button className="admin-logout">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="complaints-main">

        {/* Header */}
        <header className="complaints-header">
          <div>
            <h1>All Complaints</h1>
            <p>Manage citizen complaints and update their status</p>
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
                <strong>{totalComplaints}</strong>
              </div>

              <div className="analytics-card">
                <span>Pending</span>
                <strong>{pendingComplaints}</strong>
              </div>

              <div className="analytics-card">
                <span>In Progress</span>
                <strong>{progressComplaints}</strong>
              </div>

              <div className="analytics-card">
                <span>Resolved</span>
                <strong>{resolvedComplaints}</strong>
              </div>

            </div>

            {/* Simple Analytics Bar */}
            <div className="analytics-bar-box">

              <div className="bar-item">
                <div className="bar-label">
                  <span>Pending</span>
                  <span>{pendingComplaints}</span>
                </div>

                <div className="bar-background">
                  <div
                    className="bar pending-bar"
                    style={{
                      width: `${
                        totalComplaints
                          ? (pendingComplaints / totalComplaints) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bar-item">
                <div className="bar-label">
                  <span>In Progress</span>
                  <span>{progressComplaints}</span>
                </div>

                <div className="bar-background">
                  <div
                    className="bar progress-bar"
                    style={{
                      width: `${
                        totalComplaints
                          ? (progressComplaints / totalComplaints) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bar-item">
                <div className="bar-label">
                  <span>Resolved</span>
                  <span>{resolvedComplaints}</span>
                </div>

                <div className="bar-background">
                  <div
                    className="bar resolved-bar"
                    style={{
                      width: `${
                        totalComplaints
                          ? (resolvedComplaints / totalComplaints) * 100
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
              <span>{totalComplaints} Complaints</span>
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

                  {complaints.map((complaint) => (

                    <tr key={complaint.id}>

                      <td>#{complaint.id}</td>

                      <td className="complaint-title">
                        {complaint.title}
                      </td>

                      <td>
                        {complaint.citizen}
                      </td>

                      {/* Department Dropdown */}
                      <td>
                        <select
                          value={complaint.department}
                          onChange={(e) =>
                            handleDepartmentChange(
                              complaint.id,
                              e.target.value
                            )
                          }
                          className="department-select"
                        >
                          <option>Public Works</option>
                          <option>Water Department</option>
                          <option>Electricity</option>
                          <option>Health Department</option>
                          <option>Education Department</option>
                        </select>
                      </td>

                      {/* Status Dropdown */}
                      <td>
                        <select
                          value={complaint.status}
                          onChange={(e) =>
                            handleStatusChange(
                              complaint.id,
                              e.target.value
                            )
                          }
                          className={`status-select ${
                            complaint.status === "Pending"
                              ? "status-pending"
                              : complaint.status === "In Progress"
                              ? "status-progress"
                              : "status-resolved"
                          }`}
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Resolved</option>
                        </select>
                      </td>

                    </tr>

                  ))}

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