import React, { useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavbarItems } from "./NavbarItems";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import EventBus from "../../common/EventBus";
import { logout } from "../../Redux/User/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbartop() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    axios.get("https://localhost:44310/Account/Logout", {
      headers: { Authorization: `Bearer ${currentUser.accessToken}` },
    });
  }

  const logOut = useCallback(() => {
    logoutUser();
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Beginner.pl</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {currentUser.userRole === "Employer" &&
              NavbarItems.map((item) => {
                return (
                  <Nav.Link key={item.id} href={item.url}>
                    {item.title}
                  </Nav.Link>
                );
              })}
          </Nav>
          {currentUser.userId !== "" ? (
            <Nav className="pullright">
              <Button
                type="button"
                variant="light"
                onClick={() =>
                  navigate(`../User/${currentUser.userId}`, {
                    replace: true,
                  })
                }
              >
                Profil
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  logOut();
                  navigate(`../`, {
                    replace: true,
                  });
                  window.location.reload();
                }}
              >
                Wyloguj się
              </Button>
            </Nav>
          ) : (
            <Nav className="pullright">
              <Button variant="light" href="/Login">
                Zaloguj się
              </Button>

              <Button variant="dark" href="/Register">
                Zarejestruj się
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
