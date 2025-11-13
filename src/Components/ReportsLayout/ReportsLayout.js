import React from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  // You can extend this to multiple reports later
  const reports = [
    {
      id: 1,
      title: "Patient Health Report",
      description: "Summary of your recent health checkup and consultations.",
      file: "/patient_report.pdf",
      date: "2025-01-15",
    },
  ];

  return (
    <div className="reports-container">
      <h2>Your Reports</h2>
      <p className="reports-subtitle">
        View and download your medical reports from here.
      </p>

      <div className="reports-table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Report Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>View</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td>{index + 1}</td>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>{report.date}</td>
                <td>
                  <a
                    href={report.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="report-link"
                  >
                    View
                  </a>
                </td>
                <td>
                  <a
                    href={report.file}
                    download="patient_report.pdf"
                    className="report-link"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsLayout;
