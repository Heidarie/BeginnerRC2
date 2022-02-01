import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

import { Button, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";
function Profile() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState("");
  const [userOffers, setUserOffers] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  function getUser() {
    axios
      .get(`https://localhost:44310/User/GetUserProfile?userId=${id}`)
      .then((response) => {
        console.log("TYPOWY CALL", response.data);
        checkToRedirect(response.data);
        if (response.data.isUserMainAccount) {
          setUser(response.data);
          getUserOffers();
        } else {
          setUser(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getUserOffers() {
    const config = {
      headers: { Authorization: `Bearer ${currentUser.accessToken}` },
    };
    axios
      .get(
        `https://localhost:44310/User/GetAll${currentUser.userRole}Offers?userId=${id}`,
        config
      )
      .then((response) => {
        console.log("OFERTY", response.data);
        setUserOffers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function checkToRedirect(data) {
    if (data === "") {
      navigate(`../404Page`, {
        replace: true,
      });
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div className="Profile_Section">
        <div className="Profile_Wrapper">
          <Row
            className="bg-warning bg-gradient shadow"
            style={{
              borderRadius: "25px",
            }}
          >
            <Col className="col-12 col-lg-3 overflow-hidden img-fluid d-flex ps-4 align-items-center justify-content-center">
              <img
                src={`data:image/png;base64,${user.userPictureConverted}`}
                width={200}
                alt={`data:image/png;base64,${user.userPictureConverted}`}
                className="m-3 rounded img-fluid"
              />
            </Col>
            <Col className="col-12 col-lg-7  text-start pt-2">
              <Row className="m-3">
                <Col className="col-12 col-xxl-10 ">
                  <h6 className="display-6">
                    {user.name + " " + user.surname}
                  </h6>{" "}
                  <p className="lead mb-0">{user.profession}</p>
                </Col>
                <Col className="col-12 col-xxl-2"></Col>
                <Col className="col-12">
                  <h4 className="text-muted">EMAIL: {user.email}</h4>
                </Col>
                <Col className="col-12">
                  <p className="lead mb-0">O mnie : {user.aboutMe}</p>
                </Col>
                <Col className="col-12">
                  <p className="lead mb-0">
                    Doświadczenie : {user.userExperience}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col className="col-12 col-lg-2 text-end">
              {user.isUserMainAccount && (
                <Button
                  className="m-3"
                  variant="dark"
                  href={`../User/Edit/${id}`}
                >
                  Edytuj
                </Button>
              )}
            </Col>
          </Row>
          {user.isUserMainAccount && currentUser.userRole === "Employee" && (
            <Row className="d-flex justify-content-between">
              <Col
                style={{
                  borderRadius: "25px",
                }}
                className="col-12 col-sm-5 m-3 col-xl-3 bg-light bg-gradient shadow"
              >
                <Row className="text-center ">
                  <Col className="col-12">
                    <h6 className="lead m-1" style={{ wordWrap: "break-word" }}>
                      TYTUL
                    </h6>
                  </Col>
                  <Col className="col-12 overflow-hidden img-fluid">
                    <img
                      src="https://tipsmake.com/data0/mimages/Wage-And-Hour-Disputes-How-To-Get-Paid-For-Working-Overtime-2.jpg"
                      alt="test"
                      className="img-fluid"
                      width={300}
                    />
                  </Col>
                  <Col className="col-12">
                    <Badge bg="success" className="text-nowrap m-2 px-4 py-2">
                      STAN
                    </Badge>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          {user.isUserMainAccount && currentUser.userRole === "Employer" && (
            <Row className="d-flex justify-content-between">
              <Col
                style={{
                  borderRadius: "25px",
                }}
                className="col-12 col-sm-5 m-3 col-xl-3 bg-light bg-gradient shadow"
              >
                <Row className="text-center ">
                  <Col className="col-12">
                    <h6 className="lead m-1" style={{ wordWrap: "break-word" }}>
                      TYTUL
                    </h6>
                  </Col>
                  <Col className="col-12 overflow-hidden img-fluid">
                    <img
                      src="https://tipsmake.com/data0/mimages/Wage-And-Hour-Disputes-How-To-Get-Paid-For-Working-Overtime-2.jpg"
                      alt="test"
                      className="img-fluid"
                      width={300}
                    />
                  </Col>
                  <Col className="col-12">
                    <Badge bg="success" className="text-nowrap m-2 px-4 py-2">
                      STAN
                    </Badge>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
