import React from 'react';
import { Container } from 'react-bootstrap';


export default function AdminFooter({ text = "Admin Footer" }) {
  return (
    <footer className="bg-dark text-white py-3 mt-auto border-top">
      <Container className="text-center">
        <h6 className="mb-0">{text}</h6>
      </Container>
    </footer>
  );
}
