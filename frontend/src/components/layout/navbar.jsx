import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";

export default function navbar() {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Test</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link active">
              Home
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
