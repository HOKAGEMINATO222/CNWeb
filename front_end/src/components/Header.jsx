import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Fixed Header</h1>
    </header>
  );
};

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '60px',
  backgroundColor: '#007bff',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

export default Header;
