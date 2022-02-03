import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";
import { Row, Col, Badge, Button } from "react-bootstrap";
import { FaHome, FaCheck } from "react-icons/fa";
import axios from "axios";
function Profile() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState("");
  const [userOffers, setUserOffers] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [employerOffer, setEmployerOffers] = useState([]);
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
          currentUser.userRole === "Employer" && getEmployerOffers();
        } else {
          setUser(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getEmployerOffers() {
    const config = { Authorization: `Bearer ${currentUser.accessToken}` };
    axios
      .get(`https://localhost:44310/Employer/GetAllEmployerOffers`, {
        headers: config,
      })
      .then((response) => {
        console.log("Offer call", response.data);
        setEmployerOffers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function finishOffer(id) {
    console.log(currentUser.accessToken);
    const config = { Authorization: `Bearer ${currentUser.accessToken}` };
    axios
      .post(
        `https://localhost:44310/Employer/FinishOffer?offerId=${id}`,
        {},
        {
          headers: config,
        }
      )
      .then((response) => {
        console.log(response);
        getEmployerOffers();
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
          <Row>
            <Col className="col-12 text-center pt-2">
              <h1 className="lead text-muted">
                Tu są wyświetlanie twoje oferty wraz z ich statusem
              </h1>
            </Col>
          </Row>
          {user.isUserMainAccount && currentUser.userRole === "Employee" && (
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
                        <h2
                          className="lead m-1 font-weight-bold"
                          style={{ wordWrap: "break-word" }}
                        >
                          {offer.positionName}
                        </h2>
                      </Col>
                      <Col className="col-12 overflow-hidden img-fluid">
                        {offer.employerImage ? (
                          <img
                            src={`data:image/png;base64,${offer.employerImage}`}
                            alt={offer.positionName}
                            className="img-fluid border border-dark"
                            width={250}
                          />
                        ) : (
                          <FaCameraRetro style={{ fontSize: "50px" }} />
                        )}
                      </Col>
                      <Col className="col-12">
                        {offer.applicationStatus === "Zaaplikowano" && (
                          <Badge
                            bg="info"
                            className="text-nowrap m-2 px-4 pt-2"
                          >
                            <h6>{offer.applicationStatus}</h6>
                          </Badge>
                        )}
                        {offer.applicationStatus === "Rozpatrywana" && (
                          <Badge
                            bg="success"
                            className="text-nowrap m-2 px-4 pt-2"
                          >
                            <h6>{offer.applicationStatus}</h6>
                          </Badge>
                        )}
                        {offer.applicationStatus === "Odrzucona" && (
                          <Badge
                            bg="warning"
                            className="text-nowrap m-2 px-4 pt-2"
                          >
                            <h6>{offer.applicationStatus}</h6>
                          </Badge>
                        )}
                      </Col>
                    </Row>
                  </Col>
                ))}
            </Row>
          )}
          {user.isUserMainAccount && currentUser.userRole === "Employer" && (
            <div>
              {employerOffer.length !== 0 &&
                employerOffer.map((offer, id) => (
                  <Row
                    className="offer-listing shadow my-2 m-1 p-2 border border-secondary rounded"
                    key={id}
                  >
                    <Col className="col-6 col-lg-10 text-start align-self-center">
                      <h6 className="lead mb-0 text-nowrap">
                        {offer.positionName}
                      </h6>
                      <Row className="d-flex align-self-center">
                        <Col className="col-12 col-sm-12 d-flex align-self-center pt-1">
                          <Badge bg="dark" className="text-nowrap me-1">
                            <FaHome className="me-1" />
                            {offer.employerName}
                          </Badge>
                          <Badge bg="dark" className="text-nowrap me-1 ">
                            <FaHome className="me-1" />
                            {offer.location}
                          </Badge>
                        </Col>
                        <Col className="col-12 col-sm-3 float-start align-self-center">
                          <small className="text-muted">
                            {offer.creationDate}
                          </small>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="col-6 col-lg-2 text-start  align-self-center">
                      <h6 className="ms-4 text-muted text-nowrap">
                        {offer.salaryFrom} - {offer.salaryTo} zł
                      </h6>
                    </Col>
                    <Col className="col-3 col-lg-3  mt-2  align-self-center">
                      <Button
                        className="btn btn-dark"
                        style={{ maxWidth: "200px", minWidth: "150px" }}
                        onClick={() =>
                          navigate(`../Offer/${offer.id}`, {
                            replace: true,
                          })
                        }
                      >
                        <FaCheck className="me-1" />
                        Wyświetl ofertę
                      </Button>
                    </Col>
                    <Col className="col-3 col-lg-3  mt-2  align-self-center ">
                      {offer.offerStatus === 2 ? (
                        <Button
                          className="btn btn-dark"
                          style={{ maxWidth: "200px", minWidth: "150px" }}
                          onClick={() =>
                            navigate(`../EditOffer/${offer.id}`, {
                              replace: true,
                            })
                          }
                        >
                          <FaCheck className="me-1" />
                          Edytuj ofertę
                        </Button>
                      ) : (
                        <Button
                          className="btn btn-dark"
                          style={{ maxWidth: "200px", minWidth: "150px" }}
                          disabled
                          onClick={() =>
                            navigate(`../EditOffer/${offer.id}`, {
                              replace: true,
                            })
                          }
                        >
                          <FaCheck className="me-1" />
                          Edytuj ofertę
                        </Button>
                      )}
                    </Col>

                    <Col className="col-3 col-lg-3 mt-2 align-self-center ">
                      <Button
                        className="btn btn-dark"
                        style={{ maxWidth: "200px", minWidth: "150px" }}
                        onClick={() =>
                          navigate(`../Offer/Applicants/${offer.id}`, {
                            replace: true,
                          })
                        }
                      >
                        <FaCheck className="me-1" />
                        Aplikanci
                      </Button>
                    </Col>
                    <Col className="col-3 col-lg-3 mt-2 align-self-center ">
                      <Button
                        className="btn btn-dark m-0 pull-right"
                        style={{ maxWidth: "200px", minWidth: "150px" }}
                        onClick={() => finishOffer(offer.id)}
                      >
                        <FaCheck className="me-1" />
                        Usuń ofertę
                      </Button>
                    </Col>
                  </Row>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
