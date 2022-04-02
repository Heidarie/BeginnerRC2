import React, { useEffect, useState } from "react";
import { Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaPeopleArrows,
  FaBolt,
  FaClock,
  FaCheckCircle,
  FaHome,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import SkeletonOfert from "../Skeletons/SkeletonOfert";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAllOffers } from "../../Redux/Offers/offerSlice";

export const OfferShortInfo = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  let offers = useSelector(getAllOffers);
  const [offerShow, setOfferShow] = useState([]);
  const [information, setInformation] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  const applyForOffer = async (id) => {
    const offerId = id;
    const config = { Authorization: `Bearer ${currentUser.accessToken}` };
    await axios
      .post(
        `https://localhost:44310/Offer/UserApply?offerId=${offerId}`,
        {},
        {
          headers: config,
        }
      )
      .then((response) => {
        getOfferDetails(offers);
        setInformation(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOfferDetails = async (offers) => {
    const offerId = offers.selectedOffer;
    const config = !offers.offers && {
      headers: { Authorization: `Bearer ${currentUser.accessToken}` },
    };
    if (offers.selectedOffer !== 0) {
      axios
        .get(
          `https://localhost:44310/Offer/GetOfferDetails?offerId=${offerId}`,
          config
        )
        .then((response) => {
          setOfferShow([response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getOfferDetails(offers);
  }, [offers]);

  return (
    <>
      {offers.loading && [1, 2, 3, 4, 5].map((n) => <SkeletonOfert key={n} />)}
      {!offers.isActiveSelected
        ? null
        : offerShow.map((offer, id) => (
            <Col
              className="d-none d-xl-block col-xl-5 shadow-sm p-0 bg-white border-none h-75"
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
                <Col className="col-3 d-flex ps-4 align-items-center justify-content-center">
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
                  <h2 className="display-6">{offer.offerName}</h2>
                  <h6 className="lead mb-0">{offer.employerName}</h6>
                  <small className="text-muted">
                    {offer.street}
                    {", "}
                    {offer.city}
                  </small>
                  <Badge bg="dark" className="text-nowrap ms-3 ">
                    <FaHome className="me-1" />
                    {offer.jobType}
                  </Badge>
                </Col>
                <Col className="col-9 text-start pt-2"></Col>
                <Col className="col-4 text-center my-2">
                  <FaPeopleArrows style={{ fontSize: "25px" }} />
                  <div
                    className="border border-dark rounded-pill text-nowrap"
                    style={{ wordBreak: "break-all" }}
                  >
                    <p className="lead mb-0">{offer.companySize}</p>
                    <small className="text-muted">Wielkość firmy</small>
                  </div>
                </Col>
                <Col className="col-4 text-center my-2">
                  <FaBolt style={{ fontSize: "25px" }} />
                  <div
                    className="border border-dark rounded-pill text-nowrap"
                    style={{ wordBreak: "break-all" }}
                  >
                    <p className="lead mb-0">{offer.experience}</p>
                    <small className="text-muted">Doświadczenie</small>
                  </div>
                </Col>
                <Col className="col-4 text-center my-2">
                  <FaClock style={{ fontSize: "25px" }} />
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
                <div className="d-grid col-6 mx-auto pb-2 ">
                  {isLoggedIn && currentUser.userRole === "Employee" ? (
                    <div>
                      {offer.applicationStatus === "Aplikuj" && (
                        <Button
                          type="button"
                          className="btn btn-warning btn-outline-dark rounded-pill col-12"
                          onClick={() => applyForOffer(offer.id)}
                        >
                          Aplikuj
                        </Button>
                      )}
                      {offer.applicationStatus === "Zaaplikowano" && (
                        <Button
                          type="button"
                          className="btn btn-success btn-outline-dark rounded-pill col-12"
                          disabled
                        >
                          {offer.applicationStatus}
                        </Button>
                      )}
                      {offer.applicationStatus === "Odrzucona" && (
                        <Button
                          type="button"
                          className="btn btn-danger  rounded-pill col-12"
                          disabled
                        >
                          {offer.applicationStatus}
                        </Button>
                      )}
                      {offer.applicationStatus === "Rozpatrywana" && (
                        <Button
                          type="button"
                          className="btn btn-warning rounded-pill col-12"
                          disabled
                        >
                          {offer.applicationStatus}
                        </Button>
                      )}

                      <Col className="col-12 text-center">
                        <small className="text-muted">{information}</small>
                      </Col>
                    </div>
                  ) : (
                    <div>
                      {currentUser.userRole !== "Employer" && (
                        <Button
                          type="button"
                          className="btn btn-warning btn-outline-dark rounded-pill col-12"
                        >
                          <Link
                            to="/Register"
                            className="text-dark text-decoration-none"
                          >
                            <h5>APLIKUJ</h5>
                          </Link>
                        </Button>
                      )}

                      {currentUser.userId !== "" &&
                      currentUser.userRole === "Employer" ? (
                        <Col className="col-12 text-center">
                          <small className="text-muted">
                            Jako pracodawca nie możesz aplikować
                          </small>
                        </Col>
                      ) : (
                        <Col className="col-12 text-center">
                          <small className="text-muted">
                            Musisz się zalogować
                          </small>
                        </Col>
                      )}
                    </div>
                  )}
                </div>
              </Row>
            </Col>
          ))}
    </>
  );
};

export default OfferShortInfo;
