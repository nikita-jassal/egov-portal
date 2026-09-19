import "./SubmitComplaint.css";

function SubmitComplaint() {
  return (
    <div className="complaint-page">

      <div className="complaint-box">

        <h1>Submit Complaint</h1>

        <p>
          Please provide details about your complaint.
        </p>

        <form>

          <div className="form-group">
            <label>Complaint Title</label>
            <input
              type="text"
              placeholder="Enter complaint title"
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <select>
              <option value="">Select Department</option>
              <option>Public Works</option>
              <option>Water Department</option>
              <option>Electricity</option>
              <option>Health Department</option>
              <option>Education Department</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter location"
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Describe your complaint"
            ></textarea>
          </div>

          <button type="submit">
            Submit Complaint
          </button>

        </form>

      </div>

    </div>
  );
}

export default SubmitComplaint;