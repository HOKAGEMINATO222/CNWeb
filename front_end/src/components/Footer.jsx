import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>Fixed Footer</p>
    </footer>
  );
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '40px',
  backgroundColor: '#343a40',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

export default Footer;
