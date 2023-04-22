import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import axios from "axios";
import "./Add.css";

const Add = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formdata", userData)
    axios
      .post("http://localhost:5001/users", userData)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
        toast("User added successfully!");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="add-button">
            add
          </button>
          <button
            type="submit"
            className="back-button"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
