import "./HowWork.css";

function HowWork() {
  const steps = [
    {
      number: "01",
      title: "Submit Complaint",
      description:
        "Citizens can submit their complaints through the online portal.",
    },
    {
      number: "02",
      title: "Complaint Assigned",
      description:
        "The complaint is reviewed and assigned to the appropriate department.",
    },
    {
      number: "03",
      title: "Status Updated",
      description:
        "Citizens can track the progress and current status of their complaint.",
    },
    {
      number: "04",
      title: "Issue Resolved",
      description:
        "The department resolves the issue and updates the final status.",
    },
  ];

  return (
    <section className="how-it-works" id="about">
      <div className="section-heading">
        <p>PROCESS</p>

        <h2>How It Works</h2>

        <span>
          A simple and transparent process for handling
          citizen complaints.
        </span>
      </div>

      <div className="steps-container">
        {steps.map((step) => (
          <div className="step-card" key={step.number}>
            <div className="step-number">
              {step.number}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowWork ;