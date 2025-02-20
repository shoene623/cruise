import React from 'react';
import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="custom-bg">
      <h1 className="center-header">About This App</h1>
      <p>This app is designed to help you plan and organize your cruise. You can add to-do items, upload photos, and keep track of everything you need to do before your departure date.</p>
      <p>We hope you have a wonderful cruise experience!</p>
    </Container>
  );
};

export default About;