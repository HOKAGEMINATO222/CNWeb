import React from 'react';

const MainContent = () => {
  return (
    <main style={mainStyle}>
      <p>
        This is the dynamic content area. Add more content here, and the height
        will adjust automatically.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique
        arcu vitae risus auctor, in fermentum tortor pulvinar.
      </p>
      <p>Keep adding more paragraphs to test!</p>
    </main>
  );
};

const mainStyle = {
  flex: 1,
  marginTop: '60px', // Matches Header height
  marginBottom: '40px', // Matches Footer height
  padding: '20px',
  backgroundColor: '#f8f9fa',
};

export default MainContent;
