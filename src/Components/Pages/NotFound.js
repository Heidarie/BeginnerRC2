import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import NotFoundImage from "./404-IMAGE.png";

const NotFound = () => {
  return (
    <section>
      <Link to={"/"}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <Container className="col-6 d-flex justify-content-center align-items-center py-5 mt-5 h-100 ">
        <Row>
          <Col
            className="col-12 shadow-sm p-2 bg-white border-none h-75 text-center"
            style={{ borderRadius: "15px" }}
          >
            <h6 className="display-6">This is a 404 page</h6>
            <img src={NotFoundImage} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default NotFound;
