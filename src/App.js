import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [userName, setUserName] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [employeeDetails, setEmployeeDetails] = useState([]);

    const getAllIntegrations = async () => {
        try {
            const response = await axios.get(
                "http://localhost:1000/api/v1/employee"
            );
            setEmployeeDetails(response.data.results.employee);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:1000/api/v1/employee",
                {
                    userName,
                    nic,
                    email
                }
            );
            console.log(response.data);
            getAllIntegrations();
        } catch (error) {
            console.error(error);
        }

        setUserName("");
        setNic("");
        setEmail("");
    };

    useEffect(() => {
        getAllIntegrations();
    }, []);

    return (
        <div>
            <div className="form-container">
                <h2 className="form-title">User Information</h2>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">
                        User Name:
                        <input
                            type="text"
                            value={userName}
                            onChange={(event) =>
                                setUserName(event.target.value)
                            }
                            className="form-input"
                        />
                    </label>
                    <br />
                    <label className="form-label">
                        NIC:
                        <input
                            type="text"
                            value={nic}
                            onChange={(event) => setNic(event.target.value)}
                            className="form-input"
                        />
                    </label>
                    <br />
                    <label className="form-label">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-input"
                        />
                    </label>
                    <br />
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>NIC</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeDetails.map((data, index) => (
                            <tr key={index}>
                                <td>{data.userName}</td>
                                <td>{data.nic}</td>
                                <td>{data.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div>
        {console.log({ employeeDetails })}
        {employeeDetails.map((post) => {
          return (
            <>
              <h4>{post.userName}</h4>
              <h4>{post.nic}</h4>
              <h4>{post.email}</h4>
              <br />
            </>
          );
        })}
      </div> */}
        </div>
    );
}

export default App;
