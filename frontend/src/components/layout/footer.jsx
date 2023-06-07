import React from "react";
import { Card } from "react-bootstrap";

export default function footer() {
  return (
    <>
      {/* Footer */}
      <Card className="text-center mt-5">
        <Card.Header>Test</Card.Header>
        <Card.Body>
          <Card.Title>Scandiweb Test Assignment</Card.Title>
          <Card.Text>Made with ♥ Ahmed Kosary</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
