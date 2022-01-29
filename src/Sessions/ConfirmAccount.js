import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
const ConfirmAccount = () => {
  useEffect(() => {
    axios
      .get("https://localhost:44310/Account/ConfirmAccount")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section style={{}}>
      <Link to={"/"}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <Container className="col-6 d-flex justify-content-center align-items-center py-5 mt-5 h-100 ">
        <Row>
          <Col
            className="col-12 shadow-lg p-2 bg-white border-none h-75 text-center"
            style={{ borderRadius: "15px" }}
          >
            <h6 className="display-6">Udało Ci się potwierdzić konto</h6>
            <small className="text-muted">Beginner.pl</small>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ConfirmAccount;
