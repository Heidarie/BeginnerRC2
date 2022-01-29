import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaPeopleArrows, FaBolt, FaClock, FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import SkeletonOfert from "../Skeletons/SkeletonOfert";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAllOffers } from "../../Redux/Offers/offerSlice";
export const OfferShortInfo = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const offers = useSelector(getAllOffers);
  const offer_details = offers.offers.filter(
    (offer) => offer.id === offers.selectedOffer
  );
  const applyForOffer = async (offers) => {
    const offerId = offers.selectedOffer;
    await axios
      .post("https://localhost:44310/Offer/UserApply", offerId)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOfferDetails = async (offers) => {
    const offerId = offers.selectedOffer;
    console.log(offerId);
    console.log(!offers.isActiveSelected);
    if (offers.isActiveSelected) {
      await axios
        .post("https://localhost:44310/Offer/GetOfferDetails", offerId)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    offers.isActiveSelected !== false && getOfferDetails(offers);
  }, [offers]);

  const offersApplied = async () => {
    //DODAĆ BLOKOWANIE PRZYCISKÓW NA KTÓRE KTOŚ APLIKOWAŁ
  };

  return (
    <>
      {offers.loading && [1, 2, 3, 4, 5].map((n) => <SkeletonOfert key={n} />)}
      {!offers.isActiveSelected
        ? null
        : offer_details.map((offer, id) => (
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
                  <img
                    src={offer["offer_text"][0].company_image}
                    alt={offer["offer_text"][0].company_name}
                    width="110"
                    className="d-block"
                  />
                </Col>
                <Col className="col-9 text-start pt-2">
                  <h6 className="display-6">{offer["offer_text"][0].title}</h6>
                  <p className="lead mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <small className="text-muted">
                    {offer["offer_text"][0].street}
                    {"  "}
                    {offer["offer_text"][0].city}
                  </small>
                </Col>
                <Col className="col-4 text-center my-2">
                  <FaPeopleArrows style={{ fontSize: "25px" }} />
                  <div
                    className="border border-dark rounded-pill text-nowrap"
                    style={{ wordBreak: "break-all" }}
                  >
                    <p className="lead mb-0">
                      +-{offer["offer_text"][0].company_size}
                    </p>
                    <small className="text-muted">Wielkość firmy</small>
                  </div>
                </Col>
                <Col className="col-4 text-center my-2">
                  <FaBolt style={{ fontSize: "25px" }} />
                  <div
                    className="border border-dark rounded-pill text-nowrap"
                    style={{ wordBreak: "break-all" }}
                  >
                    <p className="lead mb-0">
                      {offer["offer_text"][0].experience}
                    </p>
                    <small className="text-muted">Doświadczenie</small>
                  </div>
                </Col>
                <Col className="col-4 text-center my-2">
                  <FaClock style={{ fontSize: "25px" }} />
                  <div
                    className="border border-dark rounded-pill text-nowrap"
                    style={{ wordBreak: "break-all" }}
                  >
                    <p className="lead mb-0">{offer.CD}</p>
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
                      <p className="mb-0">
                        • obsługiwał/ła transakcje gotówkowe i bezgotówkowe, .
                      </p>
                      <p className="mb-0">
                        • aktywnie sprzedawał/ła produkty finansowe i
                        ubezpieczenia,
                      </p>
                      <p className="mb-0">
                        • dbał/ła o wysoką jakość obsługi Klienta – również
                        telefonicznie,
                      </p>
                      <p className="mb-0">
                        • budował/ła długotrwałe relacje z Klientami
                      </p>
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
                      <p className="mb-0">• łatwo nawiązujesz relacje,</p>
                      <p className="mb-0">
                        • konsekwentnie dążysz do wyznaczonego celu,
                      </p>
                      <p className="mb-0">• cechuje Cię otwartość,</p>
                      <p className="mb-0">
                        • cenisz sobie współpracę i dobrą atmosferę w zespole,
                      </p>
                      <p className="mb-0">
                        • masz minimum średnie wykształcenie.
                      </p>
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
                        <li className="list-group-item d-flex align-items-center">
                          <FaCheckCircle
                            style={{ color: "green", fontSize: "25px" }}
                          />
                          <p className="mb-0 ps-2">
                            Stabilne zatrudnienie na umowie o pracę
                          </p>
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                          <FaCheckCircle
                            style={{ color: "green", fontSize: "25px" }}
                          />
                          <p className="mb-0 ps-2">
                            Stabilne zatrudnienie na umowie o pracę
                          </p>
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                          <FaCheckCircle
                            style={{ color: "green", fontSize: "25px" }}
                          />
                          <p className="mb-0 ps-2">
                            Stabilne zatrudnienie na umowie o pracę
                          </p>
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                          <FaCheckCircle
                            style={{ color: "green", fontSize: "25px" }}
                          />
                          <p className="mb-0 ps-2">
                            Stabilne zatrudnienie na umowie o pracę
                          </p>
                        </li>
                      </ul>
                      <ul className="col-6 list-group list-group-flush  ">
                        <li className="list-group-item d-flex align-items-center">
                          <FaCheckCircle
                            style={{ color: "green", fontSize: "25px" }}
                          />
                          <p className="mb-0 ps-2">
                            Stabilne zatrudnienie na umowie o pracę
                          </p>
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                          <FaCheckCircle
                            style={{ color: "green", fontSize: "25px" }}
                          />
                          <p className="mb-0 ps-2">
                            Stabilne zatrudnienie na umowie o pracę
                          </p>
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                          <FaCheckCircle
                            style={{ color: "green", fontSize: "25px" }}
                          />
                          <p className="mb-0 ps-2">
                            Stabilne zatrudnienie na umowie o pracę
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <div className="d-grid col-6 mx-auto pb-2 text-end">
                  {isLoggedIn ? (
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={() => applyForOffer()}
                    >
                      Aplikuj
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill "
                    >
                      <Link
                        to="/Register"
                        className="text-warning text-decoration-none"
                      >
                        <h5>APLIKUJ</h5>
                      </Link>
                    </button>
                  )}
                </div>
              </Row>
            </Col>
          ))}
    </>
  );
};
export default OfferShortInfo;
