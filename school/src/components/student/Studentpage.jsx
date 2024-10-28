import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../../assets/Images/background image.jpg'; // Import the background image

const Studentpage = () => {
  const navigate = useNavigate();
  const [flippedIndex, setFlippedIndex] = useState(null); // Track the flipped circle

  const handleFlip = (index, path) => {
    setFlippedIndex(index); // Set the circle to flip
    setTimeout(() => {
      setFlippedIndex(null); // Reset flip state after animation
      navigate(path); // Navigate to the desired page
    }, 600); // Timeout matches flip animation duration
  };

  const circleStyle = {
    width: '200px',
    height: '200px',
    cursor: 'pointer',
    transition: 'transform 0.6s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: 'white',
    position: 'relative',
  };

  const textStyle = {
    transform: 'rotateY(180deg)', // Counter-rotate the text
  };

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={pageStyle}>
      <div className="text-center">
        <h2 className="text-primary mb-5">Welcome Student</h2> {/* Heading */}
        <div className="d-flex justify-content-center gap-5">
          {/* Student Dashboard Circle */}
          <div
            style={{
              ...circleStyle,
              backgroundColor: '#4A148C',
              transform: flippedIndex === 0 ? 'rotateY(180deg)' : 'none', // Flip the circle
            }}
            onClick={() => handleFlip(0, '/studenthomepage')}
          >
            <h4 style={flippedIndex === 0 ? textStyle : {}}>Student Dashboard</h4> {/* Keep text upright */}
          </div>

          {/* Syllabus Circle */}
          <div
            style={{
              ...circleStyle,
              backgroundColor: '#1E88E5',
              transform: flippedIndex === 1 ? 'rotateY(180deg)' : 'none', // Flip the circle
            }}
            onClick={() => handleFlip(1, '/syllabus')}
          >
            <h4 style={flippedIndex === 1 ? textStyle : {}}>Syllabus</h4> {/* Keep text upright */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentpage;