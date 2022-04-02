import React, { useState } from "react";
import { FloatingLabel, Row, Col, Badge } from "react-bootstrap";
import { FaHome, FaCheck } from "react-icons/fa";
import SkeletonOfert from "../Skeletons/SkeletonOfert";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedOffer, getAllOffers } from "../../Redux/Offers/offerSlice";
import "./OfferList.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import OfferPagination from "./OfferPagination";

export default function OfferList(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCity, setSearchCity] = useState("");
  let offers = {
    error: true,
    loading: true,
    offers: [],
  };
  const [page, setPage] = useState(1);
  const offersPerPage = 10;
  const [classList, setClassList] = useState(false);
  const [prevId, setPrevId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  offers = useSelector(getAllOffers);
  let cities = [...new Set(offers.offers.map((item) => item.location))];
  const indexOfLastOffer = page * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offers.offers.slice(
    indexOfFirstOffer,
    indexOfLastOffer
  );

  //Function to show shortInfo Of selectefOffer
  function setVisible(id) {
    //TODO IMPROVE IF
    if (id !== prevId) {
      setPrevId(id);
      setClassList(true);
    } else {
      {
        classList ? setClassList(false) : setClassList(true);
      }
    }
  }

  function search(rows) {
    if (searchTerm !== "" && searchCity === "") {
      return rows.filter(
        (row) =>
          row.positionName.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1 || row.languages.indexOf(searchTerm.toLowerCase()) > -1
      );
    } else if (searchCity !== "") {
      return rows.filter((row) => row.location.indexOf(searchCity) > -1);
    }
    return rows;
  }

  return (
    <Col
      className={`col-12 border border-dark ${
        classList ? "col-xl-6" : "col-xl-10"
      } `}
      style={{ borderRadius: "25px", minHeight: "1200px" }}
    >
      <Row className="justify-content-center align-items-center ">
        <Col className="col-12 text-start col-lg-5">
          <h6 className="display-5 mb-2">{props.title}</h6>
        </Col>
        <Col className="col-12 text-start col-lg-7">
          <FloatingLabel
            controlId="floatingInput"
            label="Szukaj..."
            className="form-label"
          >
            <Form.Control
              type="text"
              className="form-control rounded-pill h-25 mt-3"
              placeholder="Miasto, Kraj"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </FloatingLabel>
        </Col>
      </Row>
      {/*Miejscowość z odległością*/}
      <Row className="justify-content-md-between align-items-center pb-2">
        <Col className="col-8 col-lg-5 py-2">
          <Form.Select
            className="rounder rounded-pill"
            onChange={(e) => setSearchCity(e.target.value)}
            style={{ height: "55px" }}
          >
            <option value="">Wybierz miasto</option>
            {cities.map((item, id) => (
              <option key={id} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col className="col-4 col-lg-3 ">
          <FloatingLabel controlId="floatingSelect" label="Odległość">
            <Form.Select className="rounded-pill">
              <option>+30KM</option>
              <option value="1">+5KM</option>
              <option value="2">+10KM</option>
              <option value="3">+15KM</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col className="col-4 col-lg-3 ">
          <FloatingLabel controlId="floatingSelect" label="Sortowanie">
            <Form.Select className="rounded-pill ">
              <option>Domyślnie</option>
              <option value="1">Według najnowszych</option>
              <option value="2">Rosnąco</option>
              <option value="3">Mlejąco</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      {/*Wyświetlanie ofert na podstawie FORMA*/}
      {offers.loading && [1, 2, 3, 4, 5].map((n) => <SkeletonOfert key={n} />)}
      {offers.error ? (
        <h1>Wystąpił błąd. Spróbuj odświeżyć</h1>
      ) : (
        search(currentOffers)?.map((offer_details, id) => (
          <Row
            key={id}
            id={offer_details.id}
            className="offer-listing shadow my-2 m-1 p-2 border border-secondary rounded"
            onClick={() =>
              window.screen.width >= 1200
                ? dispatch(setSelectedOffer(offer_details.id)) &&
                  setVisible(offer_details.id)
                : navigate({
                    pathname: `/Offer/${offer_details.id}`,
                  })
            }
          >
            <Col className="col-6 col-lg-4 text-start align-self-center">
              <h6 className="lead mb-0 text-nowrap">
                {offer_details.positionName}
              </h6>
              <Row className="d-flex align-self-center">
                <Col className="col-12 col-sm-12 d-flex align-self-center pt-1">
                  <Badge bg="dark" className="text-nowrap me-1">
                    <FaHome className="me-1" />
                    {offer_details.employerName}
                  </Badge>
                  <Badge bg="dark" className="text-nowrap me-1 ">
                    <FaHome className="me-1" />
                    {offer_details.location}
                  </Badge>
                </Col>
                <Col className="col-12 col-sm-3 float-start align-self-center">
                  <small className="text-muted">{offer_details.CD}</small>
                </Col>
              </Row>
            </Col>
            <Col className="col-6 col-lg-3 text-start align-self-center">
              <h6 className="ms-4  text-muted text-nowrap">
                {offer_details.salaryFrom} - {offer_details.salaryTo} zł
              </h6>
            </Col>
            <Col className="col-6 col-lg-3 text-start align-self-center">
              {offer_details.languages.map((lang, id) => (
                <Badge key={id} bg="info" className="text-nowrap me-2">
                  {lang.toUpperCase()}
                </Badge>
              ))}
            </Col>
            <Col className="col-6 col-lg-2 text-end align-self-center">
              <h6 className="text-muted">
                <FaCheck className="me-1" />
                Aplikuj
              </h6>
            </Col>
          </Row>
        ))
      )}
      <OfferPagination
        page={page}
        setPage={setPage}
        offersPerPage={offersPerPage}
        totalOffers={offers.offers.length}
      />
    </Col>
  );
}
