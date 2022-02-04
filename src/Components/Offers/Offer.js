import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import {
  FaPeopleArrows,
  FaBolt,
  FaCoins,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function Offer() {
  const { id } = useParams();
  const [offerShow, setOfferShow] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  const getOfferDetails = async (offers) => {
    const config = {
      headers: { Authorization: `Bearer ${currentUser.accessToken}` },
    };
    axios
      .get(
        `https://localhost:44310/Offer/GetOfferDetails?offerId=${id}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        setOfferShow([response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOfferDetails();
  }, []);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Link to={"/"}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <Container className="col-6 d-flex justify-content-center align-items-center py-5 h-100">
        <Row>
          {offerShow.length !== 0 &&
            offerShow.map((offer, id) => (
              <Col
                className=" shadow-sm p-0 bg-white border-none h-75"
                style={{ borderRadius: "15px" }}
                key={id}
              >
                <Row
                  className="bg-warning bg-gradient"
                  style={{
                    borderRadius: "25px",
                    boxShadow: "0px 15px 10px -15px #111",
                  }}
                >
                  <Col className="col-3 d-flex ps-4 pt-2 align-items-center justify-content-center overflow-hidden img-fluid">
                    <Link to={`../User/${offer.employerId}`}>
                      <img
                        src={`data:image/png;base64,${offer.image}`}
                        alt={offer.employerId}
                        className="img-fluid border border-dark"
                        width={150}
                      />
                    </Link>
                  </Col>
                  <Col className="col-9 text-start pt-2">
                    <Row>
                      <Col className="col-12 col-xxl-10">
                        <h6 className="display-6">{offer.offerName}</h6>
                      </Col>
                      <Col className="col-12 col-xxl-3 ">
                        <Badge bg="danger" className="text-nowrap">
                          <h6>{offer.jobType}</h6>
                        </Badge>
                      </Col>
                      <Col className="col-12">
                        <small className="text-muted">
                          {offer.street}
                          {",  "}
                          {offer.city}
                        </small>
                      </Col>
                      <Col className="col-12">
                        <h6 className="text-muted">{offer.employerName}</h6>
                      </Col>
                    </Row>
                  </Col>

                  <Col className="col-12 col-md-3 text-center my-2">
                    <FaPeopleArrows
                      className="mb-1"
                      style={{ fontSize: "25px" }}
                    />
                    <div
                      className="border border-dark rounded-pill text-nowrap"
                      style={{ wordBreak: "break-all" }}
                    >
                      <p className="lead mb-0">{offer.companySize}</p>
                      <small className="text-muted">Wielkość firmy</small>
                    </div>
                  </Col>
                  <Col className="col-12 col-md-3 text-center my-2">
                    <FaCoins className="mb-1" style={{ fontSize: "25px" }} />
                    <div
                      className="border border-dark rounded-pill text-nowrap"
                      style={{ wordBreak: "break-all" }}
                    >
                      <p className="lead mb-0">
                        {offer.salaryFrom + " - " + offer.salaryTo + " zł"}
                      </p>
                      <small className="text-muted">Zarobki</small>
                    </div>
                  </Col>
                  <Col className="col-12 col-md-3 text-center my-2">
                    <FaBolt className="mb-1" style={{ fontSize: "25px" }} />
                    <div
                      className="border border-dark rounded-pill text-nowrap"
                      style={{ wordBreak: "break-all" }}
                    >
                      <p className="lead mb-0">
                        {offer.experience ? offer.experience : "Brak"}
                      </p>
                      <small className="text-muted">Doświadczenie</small>
                    </div>
                  </Col>
                  <Col className="col-12 col-md-3 text-center my-2">
                    <FaClock className="mb-1" style={{ fontSize: "25px" }} />
                    <div
                      className="border border-dark rounded-pill text-nowrap"
                      style={{ wordBreak: "break-all" }}
                    >
                      <p className="lead mb-0">{offer.creationDate}</p>
                      <small className="text-muted">Data wystawienia</small>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-12">
                    <div
                      className="shadow-sm border border-light m-2 p-2"
                      style={{ borderRadius: "10px" }}
                    >
                      <h4> JĘZYKI</h4>
                      {offer.languages.length !== 0 &&
                        offer.languages.map((lang, id) => (
                          <Badge bg="info" className="text-nowrap me-2">
                            <h6>{lang}</h6>
                          </Badge>
                        ))}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div
                      className="shadow-sm border border-light m-2 p-2"
                      style={{ borderRadius: "10px" }}
                    >
                      <p className="lead mb-2">Nasze wymagania</p>
                      <small className="text-muted ms-2">U NAS BĘDZIESZ:</small>

                      <div className="ms-4">
                        <p className="mb-0">{offer.description}</p>
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div
                      className="shadow-sm border border-light m-2 p-2"
                      style={{ borderRadius: "10px" }}
                    >
                      <p className="lead mb-2">Twój zakres obowiązków</p>
                      <small className="text-muted ms-2">
                        CZEKAMY NA CIEBIE, JEŚLI:
                      </small>

                      <div className="ms-4">
                        <p className="mb-0">{offer.duties}</p>
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div
                      className="shadow-sm border border-light m-2 p-2 "
                      style={{ borderRadius: "10px" }}
                    >
                      <p className="lead mb-2">To oferujemy</p>

                      <div className="d-flex ms-2">
                        <ul className="col-6 list-group list-group-flush justify-content-center ">
                          {offer.length !== 0 &&
                            offer.benefits.slice(0, 4).map((benefit, id) => (
                              <li
                                className="list-group-item d-flex align-items-center"
                                key={id}
                              >
                                <FaCheckCircle
                                  style={{ color: "green", fontSize: "25px" }}
                                />
                                <p className="mb-0 ps-2">{benefit}</p>
                              </li>
                            ))}
                        </ul>
                        <ul className="col-6 list-group list-group-flush  ">
                          {offer.length !== 0 &&
                            offer.benefits.slice(4, 8).map((benefit, id) => (
                              <li
                                className="list-group-item d-flex align-items-center"
                                key={id + 4}
                              >
                                <FaCheckCircle
                                  style={{ color: "green", fontSize: "25px" }}
                                />
                                <p className="mb-0 ps-2">{benefit}</p>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
}
