import React from "react";
import { Row, Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Navbartop from "../Navbar/Navbartop";
import DashboardWorker from "../Profiles/DashboardWorker";
export default function NewPage() {
  // NOT SURE ABOUT USER LOGGED

  return (
    <>
      <Navbartop />
      <section style={{ backgroundColor: "#eee" }}>
        <Container className="justify-content-center align-items-center py-5">
          <Row className="justify-content-around align-items-top">
            <DashboardWorker />
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
