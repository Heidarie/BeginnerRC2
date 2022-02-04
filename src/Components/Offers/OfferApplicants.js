import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function OfferApplicants() {
  const { id } = useParams();
  const [offerApplicants, setOfferApplicants] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  function showOfferApplicants(id) {
    const config = { Authorization: `Bearer ${currentUser.accessToken}` };
    axios
      .get(
        `https://localhost:44310/Employer/GetOfferApplicants?offerId=${id}`,
        {
          headers: config,
        }
      )
      .then((response) => {
        console.log("Applicants call", response.data);
        setOfferApplicants(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function changeStatus(offerId, applicantId, status) {
    const config = { Authorization: `Bearer ${currentUser.accessToken}` };
    axios
      .post(
        `https://localhost:44310/Employer/ChangeApplicationStatus?offerId=${offerId}&userId=${applicantId}&statusId=${status}`,
        {},
        {
          headers: config,
        }
      )
      .then((response) => {
        // const updatedApplicants = offerApplicants.map((applicant) => {
        //   if (applicant.id === applicantId) {
        //     applicant.statusId = status;
        //   }
        //   setOfferApplicants(updatedApplicants);
        // });
        showOfferApplicants(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getEmployerOffers(id) {
    const config = { Authorization: `Bearer ${currentUser.accessToken}` };
    axios
      .get(`https://localhost:44310/Employer/GetAllEmployerOffers`, {
        headers: config,
      })
      .then((response) => {
        const res = response.data.filter((offer) => {
          if (offer.id === parseInt(id)) {
            return offer;
          }
        });

        console.log("Offer call", res);
        setSelectedOffer(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    showOfferApplicants(id);
    getEmployerOffers(id);
    if (currentUser.userRole !== "Employer") {
      navigate(`../`, {
        replace: true,
      });
      window.location.reload();
    }
  }, []);
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Link to={"/"}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <Container className="col-6 d-flex justify-content-center align-items-center py-5 h-100">
        {selectedOffer.length !== 0 &&
          selectedOffer.map((offer, id) => (
            <Col className="col-12" key={offer.id}>
              <Row
                className=" shadow my-2 m-1 p-2 border border-secondary rounded"
                key={offer.id}
              >
                <Col className="col-12 col-lg-12 text-center align-self-center">
                  <h6 className="display-4 mb-5 text-nowrap text-center">
                    {offer.positionName}
                  </h6>
                  {offerApplicants.length !== 0 &&
                    offerApplicants.map((applicant, id) => (
                      <Row
                        className="d-flex mb-4 align-self-center border border-dark rounded border-3 pt-2 my-2 mx-2"
                        key={applicant.id}
                      >
                        <Col className="col-12 col-lg-6 d-flex align-self-center pt-1">
                          <Link
                            className="text-decoration-none text-warning"
                            to={`../User/${applicant.id}`}
                          >
                            <h2>{applicant.name + " " + applicant.surname}</h2>
                          </Link>
                        </Col>
                        {applicant.statusId === 1 && (
                          <Col className="col-12 col-lg-6 text-end  align-self-center">
                            <Button
                              className="btn btn-success me-2"
                              style={{ maxWidth: "200px", minWidth: "150px" }}
                              onClick={() =>
                                changeStatus(offer.id, applicant.id, 2)
                              }
                            >
                              Akceptuj
                            </Button>
                            <Button
                              className="btn btn-danger"
                              style={{ maxWidth: "200px", minWidth: "150px" }}
                              onClick={() =>
                                changeStatus(offer.id, applicant.id, 3)
                              }
                            >
                              Odrzuć
                            </Button>
                          </Col>
                        )}
                        {applicant.statusId === 2 && (
                          <Col className="col-12 col-lg-6 text-end  align-self-center">
                            <Badge className="bg-success">
                              <h6><FaCheck className="me-1" />Zaakceptowano</h6>
                            </Badge>
                          </Col>
                        )}
                        {applicant.statusId === 3 && (
                          <Col className="col-12 col-lg-6 text-end  align-self-center">
                            <Badge>
                              <ImCross className="me-1" />
                              <h6>Odrzucono</h6>
                            </Badge>
                          </Col>
                        )}
                        <Col className="col-12 col-lg-12 text-start">
                          <small>{applicant.profession}</small>
                        </Col>
                      </Row>
                    ))}
                </Col>
              </Row>
            </Col>
          ))}
      </Container>
    </section>
  );
}
