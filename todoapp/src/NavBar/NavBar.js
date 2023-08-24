import React, { useState, useEffect } from 'react';
import './NavBar.css'; // Import your custom CSS if needed
import axios from 'axios';

function Navbar() {
  const API_BASE = "http://localhost:4000";

  const [profile, setProfile] = useState({});

  useEffect(() => {
    GetProfile();
  }, []);

  const GetProfile = async () => {
    try {
      const response = await axios.get(API_BASE + "/current-user", {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      // If the API call is successful, set the data to the state
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand">
        <h3 className="fas fa-rocket">Welcome {profile.name}</h3>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          {profile.email && (
            <li className="nav-item">
              <a className="nav-link" href="/history">History</a>
            </li>
          )}
          <li className="nav-item">
            <a className="nav-link" href="/profile">Profile</a>
          </li>
        </ul>
         {profile.image && (
          <div className="user-image">
            <img src={`data:${profile.image.contentType};base64,${profile.image.data}`} alt="User" className="rounded-circle" />
          </div>
        )} 
      </div>
    </nav>
  );
}

export default Navbar;
