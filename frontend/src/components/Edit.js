import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import axios from "axios";

const Edit = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5001/users/${id}`, user)
      .then((response) => {
        console.log(response);
        toast("User updated successfully!");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="emailId"
              value={user.emailId}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="add-button">
            Update
          </button>
          <button
            type="button"
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

export default Edit;
