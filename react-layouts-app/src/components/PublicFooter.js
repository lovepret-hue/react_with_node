import React from 'react';
import { Container } from 'react-bootstrap';

export default function PublicFooter({ text = "Public Footer" }) {
  return (
    <footer style={{ backgroundColor: '#563d7c' }} className="py-3 text-white mt-auto">
      <Container className="text-center">
        <h6 className="mb-0">{text}</h6>
      </Container>
    </footer>
  );
}
