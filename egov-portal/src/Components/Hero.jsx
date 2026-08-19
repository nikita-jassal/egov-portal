import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-tagline">
          DIGITAL GOVERNANCE PLATFORM
        </p>

        <h1>
          Making Governance
          <span> Simple & Accessible</span>
        </h1>

        <p className="hero-description">
          Submit complaints, track their progress, and
          stay informed about the resolution of public
          issues through one simple platform.
        </p>

        
      </div>

      
        <div className="hero-card">
          <h3>Complaint Tracking</h3>
          <p>Submit → Assigned → In Progress → Resolved</p>
        </div>
      
    </section>
  );
}

export default Hero;