import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./components.css";

export const NavBar = () => {
  return (
    <Navbar className="nav" variant="dark" expand="lg">
      <Container className="ps-2 pe-2">
        <Navbar.Brand as={Link} to="/" className="logo sourceSerifPro text-info">
          MY BOOKS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/allbooks" className="workSans">
              Books
            </Nav.Link>
            <Nav.Link as={Link} to="/oldbooks" className="workSans">
              Before 2013
            </Nav.Link>
            <Nav.Link as={Link} to="/dramabooks" className="workSans">
              Drama
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/createbook" className="workSans">
              Add New Book
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
