import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";
import { FloatingLabel, Row, Col, Badge, Button } from "react-bootstrap";
import { FaHome, FaCheck } from "react-icons/fa";
import axios from "axios";
function Profile() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState("");
  const [userOffers, setUserOffers] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  function getUser() {
    axios
      .get(`https://localhost:44310/User/GetUserProfile?userId=${id}`)
      .then((response) => {
        console.log("TYPOWY CALL", response.data);
        checkToRedirect(response.data);
        if (response.data.isUserMainAccount) {
          setUser(response.data);
          response.data.employeeApplications !== null &&
            setUserOffers(response.data.employeeApplications);
        } else {
          setUser(response.data);
        }
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
  function setVisibleApplicants(id) {}
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
              {user.userPictureConverted ? (
                <img
                  src={`data:image/jpeg;base64,${user.userPictureConverted}`}
                  width={200}
                  alt="Profile Picture"
                  className="m-3 rounded img-fluid"
                />
              ) : (
                <FaCameraRetro style={{ fontSize: "50px" }} />
              )}
            </Col>
            <Col className="col-12 col-lg-7  text-start pt-2">
              <Row className="m-3">
                <Col className="col-12 col-xxl-10 ">
                  <h6 className="display-6">
                    {user.name + " " + user.surname}
                  </h6>
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
          <Row className="d-flex justify-content-between">
            {userOffers.length !== 0 &&
              userOffers.map((offer, id) => (
                <Col
                  style={{
                    borderRadius: "25px",
                  }}
                  className="col-12 col-sm-5 m-3 col-xl-3 bg-light bg-gradient shadow"
                  key={id}
                >
                  {console.log("jestem w pętli")}
                  <Row className="text-center ">
                    <Col className="col-12">
                      <h6
                        className="lead m-1"
                        style={{ wordWrap: "break-word" }}
                      >
                        TYTUL
                      </h6>
                    </Col>
                    <Col className="col-12 overflow-hidden img-fluid">
                      {offer.employerImage ? (
                        <img
                          src={`data:image/png;base64,${offer.employerImage}`}
                          alt={id + 1}
                          className="img-fluid"
                          height={100}
                        />
                      ) : (
                        <FaCameraRetro style={{ fontSize: "50px" }} />
                      )}
                    </Col>
                    <Col className="col-12">
                      <Badge bg="success" className="text-nowrap m-2 px-4 py-2">
                        {offer.applicationStatus}
                      </Badge>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
          ;
          {user.isUserMainAccount && currentUser.userRole === "Employer" && (
            <Row
              className="offer-listing shadow my-2 m-1 p-2 border border-secondary rounded"
              onClick={() => setVisibleApplicants()}
            >
              <Col className="col-6 col-lg-4 text-start align-self-center">
                <h6 className="lead mb-0 text-nowrap">POZYCJA</h6>
                <Row className="d-flex align-self-center">
                  <Col className="col-12 col-sm-12 d-flex align-self-center pt-1">
                    <Badge bg="dark" className="text-nowrap me-1">
                      <FaHome className="me-1" />
                      TWOJA NAZWA
                    </Badge>
                    <Badge bg="dark" className="text-nowrap me-1 ">
                      <FaHome className="me-1" />
                      LOKALIZACJA
                    </Badge>
                  </Col>
                  <Col className="col-12 col-sm-3 float-start align-self-center">
                    <small className="text-muted">CREATION TIME</small>
                  </Col>
                </Row>
              </Col>
              <Col className="col-6 col-lg-3 text-start align-self-center">
                <h6 className="ms-4 text-muted text-nowrap">
                  PLACA - PLACA zł
                </h6>
              </Col>
              {/* <Col className="col-6 col-lg-3 text-start align-self-center">
              {offer_details["offer_text"][0].languages.map((lang, id) => (
                <Badge key={id} bg="info" className="text-nowrap me-2">
                  {lang.toUpperCase()}
                </Badge>
              ))}
            </Col> */}
              <Col className="col-6 col-lg-3 text-start align-self-center"></Col>
              <Col className="col-6 col-lg-2 text-end align-self-center">
                <h6 className="text-muted">
                  <FaCheck className="me-1" />
                  Aplikuj
                </h6>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
