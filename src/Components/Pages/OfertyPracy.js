import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import { Row, Container } from "react-bootstrap";
import Navbartop from "../Navbar/Navbartop";
import OfferList from "../Offers/OfferList";
import { useDispatch } from "react-redux";
import { fetchAsyncOffers } from "../../Redux/Offers/offerSlice";

export default function OfertyPracy() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncOffers());
  }, [dispatch]);
  return (
    <>
      <Navbartop />
      <section style={{ backgroundColor: "#eee" }}>
        <Container className="justify-content-center align-items-center py-5">
          <Row className="justify-content-around align-items-top">
            <OfferList title={"Oferty pracy"} />
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
