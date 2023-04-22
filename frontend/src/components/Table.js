import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "./Table.css";

const Table = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/users")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // delete data in table

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/users/${id}`)
      .then((res) => {
        const updatedUserData = userData.filter((user) => user._id !== id);
        setUserData(updatedUserData);
        setCurrentPage(getCurrentPage(updatedUserData.length));
        toast('user deleted successfully')
      })
      .catch((error) => {
        console.log(error);
        setItemsPerPage();
      });
  };

  // pagination
  const getCurrentPage = (updatedUserDataLength) => {
    const totalPages = Math.ceil(updatedUserDataLength / itemsPerPage);
    return Math.min(currentPage, totalPages);
  };

  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  return (
    <div className="container">
      <h1 className="title">Python Flask And React Crud Task</h1>
      <button className="add-user-button" onClick={() => navigate("/add")}>
        Add User
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.slice(startIndex, endIndex).map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.emailId}</td>
              <td>
                <button
                  className="edit"
                  onClick={() => navigate(`/update/${user._id}`)}
                >
                  Edit
                </button>{" "}
                <button
                  className="delete"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pre"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &#x2770;&nbsp;Pre
        </button>
        <span className="count">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="next"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &nbsp;&#x2771;
        </button>
      </div>
    </div>
  );
};

export default Table;
