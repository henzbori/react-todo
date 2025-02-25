import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import landingImage from '../assets/images/michaela-st-lIdLyU_J6u4-unsplash.jpg';

const LandingPage = () => {
    const navigate = useNavigate();

    const goBackToTodoList = () => {
    navigate('/todo'); 
  };
  return (
    <div className="landing-container">
      <h1>Welcome to the TO DO LIST!</h1>
      <img 
        src={landingImage}
        alt="To Do list picture by Michaela St on Unsplash"
        className="landing-image"
      />
      <h2>To create your To Do List just click Start!</h2>
      <button className="go-back" onClick={goBackToTodoList}>Start</button>
    </div>
  );
};

export default LandingPage;