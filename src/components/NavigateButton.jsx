import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateButton = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/'); 
  };

  return (
    <button className="go-back" onClick={handleNavigation}>Go to Landing Page</button>
  );
};

export default NavigateButton;