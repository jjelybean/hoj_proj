import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Findcase = () => {

        const [searchQuery, setSearchQuery] = useState({ DOCKET_NO: "", RESPONDENT: "" });
        const [caseData, setCaseData] = useState([]); //store data
        const [error, setError] = useState(""); // error message
        const [searchPerformed, setSearchPerformed] = useState(false);

      

    const handleChange = (e) => {
        setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
    };
        
    // validate
    const handleSearch = async (e) => {
      e.preventDefault();
  
     
      if (!searchQuery.DOCKET_NO && !searchQuery.RESPONDENT) {
          setError("Please enter at least one search criteria.");
          return;
      }
  
      try {
          const response = await axios.get("http://localhost:5000/get-case", {
              params: {
                  docket_no: searchQuery.DOCKET_NO, 
                  respondent: searchQuery.RESPONDENT,
              },
          });
  
          console.log("API Response:", response.data); 
  
    
          if (Array.isArray(response.data) && response.data.length > 0) {
              setCaseData(response.data);
              setError("");
          } else {
              setCaseData([]); 
              setError("No matching case found.");
          }
  
      } catch (err) {
          console.error("API Error:", err); 
          setError("An error occurred while fetching cases.");
          setCaseData([]); 
      }
  
      setSearchPerformed(true);
  };
  

      const navigate = useNavigate();
      
    return (
        <div>

                
    <h2 style={{textAlign:'center', marginTop: '20px'}}>SEARCH FOR A CASE</h2>

            {/* BACK BUTTON  */} 
            <button type="button" class="btn btn-outline-dark" 
            style={{ marginBottom: '20px', marginLeft:'120px' }}
            onClick={() => navigate("/cases")}>
                BACK
            </button>

          <div className="container custom-bg-color pt-5 pb-5 shadow">
            <form onSubmit={handleSearch}>
            <div className="input-group mb-3">
              <span className="input-group-text">Docket/IS Case Number</span>
              <input
                type="text"
                name="DOCKET_NO"
                value={searchQuery.DOCKET_NO}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Docket/IS Case Number"
              />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Respondent</span>
                <input
                    type="text"
                    name="RESPONDENT"
                    value={searchQuery.RESPONDENT}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Respondent Name"
                />
            </div>

                {/* button */}

                <button className="btn btn-dark" type="submit"
                style={{display: 'block', margin:'0 auto'}}>
                  Search
                </button>

                {error && <p className="text-danger mt-3">{error}</p>}
            </form>

          </div>  {/*  div sa container */}

      
      <h2 style={{textAlign: 'center', marginTop: '20px'}}>SEARCH RESULTS</h2>
        {/* display sa case */}
        
        {searchPerformed  && caseData.length > 0 ? (
        <div className="container mt-4 mb-5">
        <div className="accordion mt-4" id="accordionExample" s>
          {caseData.map((item, index) => (
            <div className="accordion-item mb-3 border bprder-primary" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="true"
                  aria-controls={`collapse${index}`}
                >
                  <strong>DOCKET_NO:</strong> {item.DOCKET_NO } &nbsp;
                  <strong>RESPONDENT:</strong> {item.RESPONDENT}
                </button>
              </h2>

              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>Full Case Details</strong> <br/>
                  <br/>
                  <strong>DOCKET_NO:</strong> {item.DOCKET_NO || "N/A"} <br />
                  <strong>DATE FILED:</strong> {item.DATE_FILED || "N/A"} <br />
                  <strong>COMPLAINANT:</strong> {item.COMPLAINANT || "N/A"} <br />
                  <strong>RESPONDENT:</strong> {item.RESPONDENT || "N/A"} <br />
                  <strong>OFFENSE:</strong> {item.OFFENSE || "N/A"} <br />
                  <strong>DATE RESOLVED:</strong> {item.DATE_RESOLVED || "N/A"} <br />
                  <strong>RESOLVING_PROSECUTOR:</strong> {item.RESOLVING_PROSECUTOR || "N/A"} <br />
                  <strong>CRIMINAL CASE NUMBER:</strong> {item.CRIM_CASE_NO || "N/A"} <br />
                  <strong>BRANCH:</strong> {item.BRANCH || "N/A"} <br />
                  <strong>DATE FILED IN COURT:</strong> {item.DATEFILED_IN_COURT || "N/A"} <br />
                  <strong>REMARKS:</strong> {item.REMARKS || "N/A"} <br />
                  <strong>PENALTY:</strong> {item.PENALTY || "N/A"} <br />
                  <strong>INDEX CARD:</strong> {item.INDEX_CARDS || "N/A"} <br />
                 
                </div>
              </div>
            </div>
          ))}
        </div>
        </div> // end sa container

      ) : searchPerformed && caseData.length === 0 && error === "" ? (
        <p className="mt-3">No results to display.</p>
      ) : null}

        </div>  // end of parent div
    );
};

export default Findcase;