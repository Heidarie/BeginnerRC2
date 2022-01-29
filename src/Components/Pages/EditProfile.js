import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useParams } from "react-router";
import { BiArrowBack } from "react-icons/bi";
const onSubmit = async (data, e) => {};
export default function EditProfile() {
  const { id } = useParams();
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Link to={`/User/${id}`}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <Container className="col-10 d-flex justify-content-center align-items-center py-5 h-100">
        <Form onSubmit={() => onSubmit()}>
          <Row
            className="bg-warning bg-gradient p-2 "
            style={{
              borderRadius: "25px",
              boxShadow: "0px 15px 10px -15px #111",
            }}
          >
            <Col className="col-12 pt-2 text-center">
              <Row className="">
                <Col className="col-12 justify-content-center justify-content-lg-start">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="display-6">Imię</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      placeholder="Tytuł"
                      className="rounded rounded-pill border border-light text-center"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
}
