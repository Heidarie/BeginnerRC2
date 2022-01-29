import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaPeopleArrows,
  FaBolt,
  FaCoins,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

export default function Offer() {
  const { id } = useParams();
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Link to={"/"}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <Container className="col-6 d-flex justify-content-center align-items-center py-5 h-100">
        <Row>
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
              <Col className="col-3 d-flex ps-4 align-items-center justify-content-center">
                ZDJECIE
              </Col>
              <Col className="col-9 text-start pt-2">
                <Row>
                  <Col className="col-12 col-xxl-10">
                    <h6 className="display-6">TYTUL</h6>
                  </Col>
                  <Col className="col-12 col-xxl-2">
                    <Badge bg="danger" className="text-nowrap">
                      <h6>REMOTE</h6>
                    </Badge>
                  </Col>
                  <Col className="col-12">
                    <p className="lead mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </Col>
                  <Col className="col-12">
                    <small className="text-muted">
                      ULICA
                      {"  "}
                      MIASTO
                    </small>
                  </Col>
                  <Col className="col-12">
                    <h6 className="text-muted">NAZWA FIRMY</h6>
                  </Col>
                </Row>
              </Col>

              <Col className="col-12 col-md-3 text-center my-2">
                <FaPeopleArrows className="mb-1" style={{ fontSize: "25px" }} />
                <div
                  className="border border-dark rounded-pill text-nowrap"
                  style={{ wordBreak: "break-all" }}
                >
                  <p className="lead mb-0">+-ROZMIAR FIRMY</p>
                  <small className="text-muted">Wielkość firmy</small>
                </div>
              </Col>
              <Col className="col-12 col-md-3 text-center my-2">
                <FaCoins className="mb-1" style={{ fontSize: "25px" }} />
                <div
                  className="border border-dark rounded-pill text-nowrap"
                  style={{ wordBreak: "break-all" }}
                >
                  <p className="lead mb-0">Zarobki</p>
                  <small className="text-muted">Doświadczenie</small>
                </div>
              </Col>
              <Col className="col-12 col-md-3 text-center my-2">
                <FaBolt className="mb-1" style={{ fontSize: "25px" }} />
                <div
                  className="border border-dark rounded-pill text-nowrap"
                  style={{ wordBreak: "break-all" }}
                >
                  <p className="lead mb-0">DOŚWIADCZENIE</p>
                  <small className="text-muted">Data wystawienia</small>
                </div>
              </Col>
              <Col className="col-12 col-md-3 text-center my-2">
                <FaClock className="mb-1" style={{ fontSize: "25px" }} />
                <div
                  className="border border-dark rounded-pill text-nowrap"
                  style={{ wordBreak: "break-all" }}
                >
                  <p className="lead mb-0">DATA WSTAWIENIA</p>
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
                  <Badge bg="info" className="text-nowrap me-2">
                    <h6>C#</h6>
                  </Badge>
                  <Badge bg="info" className="text-nowrap">
                    <h6>react</h6>
                  </Badge>
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
                <Button
                  type="submit"
                  variant="warning"
                  className="btn btn-outline-dark rounded-pill"
                >
                  Aplikuj
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
