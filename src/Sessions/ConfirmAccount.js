import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";
const ConfirmAccount = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const verify = searchParams.get("verify");
  const t = searchParams.get("t");
  console.log(verify, t);
  useEffect(() => {
    const data = { UserId: t, Token: verify };
    axios
      .post("https://localhost:44310/Account/ConfirmAccount", { data })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser.accessToken]);

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
            <small className="text-muted text-center">Beginner.pl</small>
          </Col>
          <Col className="col-12  h-75 text-center">
            <Button className="btn btn-dark text-center  mt-2" href={"/Login"}>
              Zaloguj się
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ConfirmAccount;
