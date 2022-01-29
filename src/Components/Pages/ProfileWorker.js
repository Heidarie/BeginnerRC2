import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Navbartop from "../Navbar/Navbartop";
import DashboardWorker from "../Profiles/DashboardWorker";
import { useParams } from "react-router";
import axios from "axios";
export default function NewPage() {
  // NOT SURE ABOUT USER LOGGED
  const { id } = useParams();
  const [user, setUser] = useState(undefined);
  const getData = async (id, setUser) => {
    await axios
      .get("https://localhost:44310/User/GetUserData", id)
      .then((response) => {
        console.log(response);
        setUser(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData(id, setUser);
  }, [id]);
  return (
    <>
      <Navbartop />
      <section style={{ backgroundColor: "#eee" }}>
        <Container className="justify-content-center align-items-center py-5">
          <Row className="justify-content-around align-items-top">
            <DashboardWorker userData={user} />
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
