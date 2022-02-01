import Button from "@restart/ui/esm/Button";
import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  FaCameraRetro,
  FaPeopleArrows,
  FaBolt,
  FaClock,
  FaCheckCircle,
  FaCoins,
  FaMinusSquare,
} from "react-icons/fa";
import data from "../data/languages.json";
import ReactTags from "react-tag-autocomplete";
import "./ReactTags.css";
export default function Addoffer() {
  const navigate = useNavigate();
  const reactTags = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState([]);
  let input;
  const [benefits, setBenefits] = useState([]);
  const [radioJobValue, setRadioJobValue] = useState("Zdalnie");
  const [information, setInformation] = useState("");
  const radiosJob = [
    { name: "Stacjonarnie", value: "Stacjonarnie" },
    { name: "Zdalnie", value: "Zdalnie" },
    { name: "Stacjonarnie+Zdalnie", value: "Stacjonarnie+Zdalnie" },
  ];
  function removeBenefit(name) {
    const newBenefits = benefits.filter((item) => item !== name);
    setBenefits(newBenefits);
  }
  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );
  const onAddition = useCallback(
    (newTag) => {
      setTags([...tags, newTag]);
    },
    [tags]
  );

  function fileUploadHandler() {
    setValue("image", selectedFile);
  }
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { user: currentUser } = useSelector((state) => state.auth);
  const onSubmit = async (data, e) => {
    console.log(data.lang);
    const langArray = data.lang.map((obj) => {
      return obj.name;
    });
    e.preventDefault();
    const dataToSend = {
      OfferName: data.title,
      Description: data.requirements,
      EmployerName: data.company_name,
      SalaryFrom: data.income_from,
      SalaryTo: data.income_to,
      //ApplicationStatus: data.apply_option,
      City: data.city,
      Street: data.street,
      Profession: data.profession,
      //NOWE
      CompanySize: data.company_size,
      DataExperience: data.experience,
      Duties: data.duties,
      Languages: langArray,
      Benefits: data.benefits,
      JobType: data.job_type,
    };
    console.log(dataToSend);
    const config = { Authorization: `Bearer ${currentUser.accessToken}` };
    await axios
      .post("https://localhost:44310/Offer/AddOffer", dataToSend, {
        headers: config,
      })
      .then((response) => {
        setInformation(response.data);
        setTimeout(() => {
          navigate({ pathname: "/" });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Link to={"/"}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <Container className="col-6 d-flex justify-content-center align-items-center py-5 h-100">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col
              className="col-12 shadow-sm p-0 bg-white border-none h-75"
              style={{ borderRadius: "15px" }}
            >
              <Row
                className="bg-warning bg-gradient p-2 "
                style={{
                  borderRadius: "25px",
                  boxShadow: "0px 15px 10px -15px #111",
                }}
              >
                <Col className="col-12 col-lg-5 d-flex align-items-center justify-content-center">
                  <Row>
                    <Col className="col-12 text-center justify-content-lg-start">
                      <h6 className="display-6">LOGO</h6>
                    </Col>
                    <Col className="col-12 text-center justify-content-lg-start">
                      <FaCameraRetro style={{ fontSize: "50px" }} />
                    </Col>
                    <Col className="col-12 text-center justify-content-start">
                      <input
                        type="file"
                        className="form-control-file rounded rounded-pill border border-dark text-center p-2"
                        id="exampleFormControlFile1"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12 col-lg-7 pt-2 text-center">
                  <Row className="">
                    <Col className="col-12 justify-content-center justify-content-lg-start">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="display-6">
                          Tytuł oferty
                        </Form.Label>
                        <Form.Control
                          type="text"
                          size="lg"
                          placeholder="Tytuł"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("title", {
                            required:
                              "Tytuł jest wymagany do wystawienia oferty",
                            minLength: 3,
                          })}
                        />
                        {errors?.title?.type === "minLength" && (
                          <p>Tytuł nie może być krótszy niż 3 słowa</p>
                        )}
                        {errors?.title?.type === "maxLength" && (
                          <p>Tytuł nie może być dłuższy niż 50 słów</p>
                        )}
                        {errors.title && (
                          <p style={{ color: "red" }}>{errors.title.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="col-12 px-5 justify-content-center">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="lead">Profesja</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Profesja"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("profession")}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="col-12 col-lg-12 d-flex justify-content-center">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="lead">Nazwa firmy</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nazwa firmy"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("company_name", {
                            required: "Nazwa firmy jest wymagana",
                            minLength: 2,
                          })}
                        />
                        {errors?.company_name?.type === "minLength" && (
                          <p>Nazwa ulicy nie może być krótsza niż 2 litery</p>
                        )}
                        {errors?.company_name?.type === "minLength" && (
                          <p>Nazwa ulicy nie może być dłuższa niż 30 liter</p>
                        )}
                        {errors.company_name && (
                          <p style={{ color: "red" }}>
                            {errors.street.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="col-12 col-lg-4 d-flex justify-content-center">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="lead">Ulica</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ulica"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("street", {
                            required: "Ulica jest wymagana",
                            minLength: 2,
                          })}
                        />
                        {errors?.street?.type === "minLength" && (
                          <p>Nazwa ulicy nie może być krótsza niż 2 litery</p>
                        )}
                        {errors?.street?.type === "maxLength" && (
                          <p>Nazwa ulicy nie może być dłuższa niż 30 liter</p>
                        )}
                        {errors.street && (
                          <p style={{ color: "red" }}>
                            {errors.street.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="col-12 col-lg-4 d-flex justify-content-center">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="lead">Miasto</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Miasto"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("city", {
                            required: "Miasto jest wymagane",
                            minLength: 2,
                            maxLength: 30,
                          })}
                        />
                        {errors?.city?.type === "minLength" && (
                          <p>Nazwa miasta nie może być krótsze niż 2 litery</p>
                        )}
                        {errors?.city?.type === "maxLength" && (
                          <p>Nazwa miasta nie może być dłuższe niż 30 liter</p>
                        )}
                        {errors.city && (
                          <p style={{ color: "red" }}>{errors.city.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="col-12 col-lg-4 d-flex justify-content-center">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="lead text-nowrap">
                          Kod pocztowy
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Kod pocztowy"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("postal_code", {
                            required: "Kod pocztowy jest wymagany",
                            minLength: 4,
                            maxLength: 6,
                            pattern: /^\d{2}-\d{3}$/i,
                          })}
                        />
                        {errors?.postal_code?.type === "minLength" && (
                          <p>Kod pocztowy nie może być krótszy niż 4 cyfry</p>
                        )}
                        {errors?.postal_code?.type === "maxLength" && (
                          <p>Kod pocztowy nie może być dłuższy niż 2-3 cyfr</p>
                        )}
                        {errors.postal_code && (
                          <p style={{ color: "red" }}>
                            {errors.postal_code.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12 col-xl-4 text-center my-2 ">
                  <FaPeopleArrows
                    className="mb-1"
                    style={{ fontSize: "25px" }}
                  />
                  <Row className="shadow border border-dark rounded-pill text-nowrap  d-flex justify-content-center mx-1 h-75">
                    <Col className="col-12">
                      <p className="lead mb-0"></p>
                      <small className="text-muted">Ilość pracowników</small>
                    </Col>
                    <Col className="col-5 d-flex justify-content-center w-75">
                      <Form.Group
                        className="mb-3 text-center"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="number"
                          placeholder="Średnia"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("company_size")}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12 col-xl-4 text-center my-2">
                  <FaCoins className="mb-1" style={{ fontSize: "25px" }} />
                  <Row className="shadow border border-dark rounded-pill  text-nowrap mx-1 justify-content-center h-75">
                    <Col className="col-12 ">
                      <p className="lead mb-0"></p>
                      <small className="text-muted">Zarobki</small>
                    </Col>
                    <Col className="col-5 col-xl-6 justify-content-center ">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="number"
                          placeholder="Od"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("income_from", {
                            required:
                              "Wymagana jest informacja o min zarobkach",
                          })}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="col-5 col-xl-6 justify-content-center ">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="number"
                          placeholder="Do"
                          className="rounded rounded-pill border border-light text-center"
                          {...register("income_to", {
                            required:
                              "Wymagana jest informacja o max zarobkach",
                            validate: {
                              checkIfHigher: (value) => {
                                const { income_from } = getValues();
                                return (
                                  income_from < value ||
                                  "Zarobki muszą być od -> do"
                                );
                              },
                            },
                          })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12 col-xl-4 text-center my-2">
                  <FaBolt className="mb-1" style={{ fontSize: "25px" }} />
                  <Row className="shadow border border-dark rounded-pill text-nowrap pb-2 mx-1 h-75">
                    <Col className="col-12">
                      <small className="text-muted">Doświadczenie</small>
                      <p className="lead mb-0"></p>
                    </Col>
                    <Col className="col-12 d-flex justify-content-center mb-1">
                      <Form.Select
                        aria-label="Default select example"
                        className="rounded text-center rounded-pill d-flex border border-light w-75 "
                        {...register("experience")}
                      >
                        <option disabled defaultChecked>
                          Wybierz poziom
                        </option>
                        <option value="Staż">Staż</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                        <option value="Ekspert">Ekspert</option>
                        <option value="Menadżer">Menadżer</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12 col-xl-6 text-center my-2">
                  <FaClock className="mb-1" style={{ fontSize: "25px" }} />
                  <Row className="shadow border border-dark rounded-pill text-nowrap pb-2 mx-1 h-75">
                    <Col className="col-12">
                      <small className="d-block text-muted">Data dodania</small>
                    </Col>
                    <Col className="col-12 d-flex justify-content-center mb-1">
                      <Form.Group
                        className="mb-2 mt-2"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="date"
                          className="rounded rounded-pill border border-light "
                          {...register("add_date", {
                            required:
                              "Wymagana jest data dodania oferty - Dzis albo Zaplanowana",
                          })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12 col-xl-6 text-center my-2">
                  <FaClock className="mb-1" style={{ fontSize: "25px" }} />
                  <Row className="shadow border border-dark rounded-pill text-nowrap pb-2 mx-1 h-75">
                    <Col className="col-12">
                      <small className="d-block text-muted">
                        Data wygaśnięcia
                      </small>
                    </Col>
                    <Col className="col-12 d-flex justify-content-center mb-1">
                      <Form.Group
                        className="mb-2 mt-2"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="date"
                          className="rounded rounded-pill border border-light "
                          {...register("finish_date", {
                            required: "Wymagana jest data wygaśnięcia oferty",
                          })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                {/* BŁEDY */}
                {errors.income_from && (
                  <p style={{ color: "red" }}>{errors.income_from.message}</p>
                )}
                {errors.income_to && (
                  <p style={{ color: "red" }}>{errors.income_to.message}</p>
                )}
                {errors.add_date && (
                  <p style={{ color: "red" }}>{errors.add_date.message}</p>
                )}
                {/* BŁEDY */}
              </Row>
              <Row>
                <Col className="col-12">
                  <div
                    className="shadow-sm border border-light m-2 p-2"
                    style={{ borderRadius: "10px" }}
                  >
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="lead mb-2">
                        Nasze wymagania
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        {...register("requirements", {
                          required:
                            "Wymagania do pracownika są wymagane w ofercie",
                          minLength: 10,
                        })}
                      />
                      {errors?.requirements?.type === "minLength" && (
                        <p>
                          Wymagania do pracownika nie mogą być krótsze niż 10
                          słów
                        </p>
                      )}
                      {errors.requirements && (
                        <p style={{ color: "red" }}>
                          {errors.requirements.message}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                </Col>
                <Col className="col-12">
                  <div
                    className="shadow-sm border border-light m-2 p-2"
                    style={{ borderRadius: "10px" }}
                  >
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="lead mb-2">
                        Twój zakres obowiązków
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        {...register("duties", {
                          required:
                            "Zakres obowiązków pracownika jest wymagany",
                          minLength: 10,
                        })}
                      />
                      {errors?.duties?.type === "minLength" && (
                        <p>
                          Zakres obowiązków pracownika nie może być krótszy niż
                          10 słów
                        </p>
                      )}
                      {errors.duties && (
                        <p style={{ color: "red" }}>{errors.duties.message}</p>
                      )}
                    </Form.Group>
                  </div>
                </Col>
                <Col className="col-12">
                  <div
                    className="shadow-sm border border-light d-block m-2 p-2 "
                    style={{ borderRadius: "10px" }}
                  >
                    <p className="lead mb-2">To oferujemy</p>
                    <p className="text-muted">
                      Maksymalnie 8 opcji można dodać
                    </p>
                    <Col className="col-12">
                      <Form.Control
                        type="text"
                        size="md"
                        placeholder="Dodaj opcje"
                        className="rounded rounded-pill border border-dark text-center"
                        ref={(node) => {
                          input = node;
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          if (benefits.length < 8) {
                            setBenefits([...benefits, input.value]);
                            input.value = "";
                          }
                        }}
                        className="btn btn-outline-dark rounded-pill mt-2"
                      >
                        Dodaj opcję
                      </Button>
                    </Col>
                    <div className="d-flex">
                      <ul className="col-12 list-group list-group-flush justify-content-center list-none ">
                        {benefits.map((name) => (
                          <div
                            key={name}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <div className="col-6">
                              <li className="list-group-item d-flex align-items-center text-center">
                                <FaCheckCircle
                                  style={{ color: "green", fontSize: "25px" }}
                                />
                                <p className="text-muted mb-0 ps-2 text-center">
                                  {name}
                                </p>
                              </li>
                            </div>
                            <div className="col-2">
                              <FaMinusSquare
                                style={{ color: "red", fontSize: "25px" }}
                                className="d-flex ms-4"
                                onClick={() => removeBenefit(name)}
                              />
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            className="border border-dark bg-light bg-gradient p-2 mt-5 "
            style={{
              borderRadius: "25px",
              boxShadow: "0px 15px 10px -15px #111",
            }}
          >
            <Col className="col-12 mb-3">
              <h6 className="display-6 text-center pb-2">
                Dodaj języki programowania, które są niezbędne do pracy.
              </h6>
              <ReactTags
                ref={reactTags}
                tags={tags}
                suggestions={data}
                onDelete={onDelete}
                onAddition={onAddition}
                placeholderText="Dodaj język"
                style={{ color: "blue" }}
              />
            </Col>
          </Row>
          <Row
            className="border border-dark bg-light bg-gradient p-2 mt-5 "
            style={{
              borderRadius: "25px",
              boxShadow: "0px 15px 10px -15px #111",
            }}
          >
            <Col
              className="col-12 text-center mb-3"
              style={{ textAlign: "left", display: "inline-block" }}
            >
              <h6 className="display-6 text-center pb-2">Rodzaj pracy</h6>
              <ButtonGroup>
                <Row className="text-center justify-content-center">
                  {radiosJob.map((radio, id) => (
                    <div className="col-12">
                      <ToggleButton
                        key={id}
                        id={`radio1-${id}`}
                        type="radio"
                        variant={id % 2 ? "outline-warning" : "outline-dark"}
                        name="radio-job"
                        value={radio.value}
                        checked={radioJobValue === radio.value}
                        className="rounded rounded-pill text-center me-2"
                        onChange={(e) =>
                          setRadioJobValue(e.currentTarget.value)
                        }
                      >
                        {radio.name}
                      </ToggleButton>
                    </div>
                  ))}
                </Row>
              </ButtonGroup>
            </Col>
          </Row>
          <Row
            className="border border-dark bg-light bg-gradient p-2 mt-5 "
            style={{
              borderRadius: "25px",
              boxShadow: "0px 15px 10px -15px #111",
            }}
          >
            <Col className="col-12 pt-2 text-center ">
              <Col className="col-12 text-center mb-3 ">
                <h6 className="display-6 ">To wszystko :)</h6>
              </Col>
            </Col>
            <div className="d-grid col-6 mx-auto pb-2 text-end">
              {setValue("lang", tags)}
              {setValue("benefits", benefits)}
              {setValue("job_type", radioJobValue)}
              <Button
                type="submit"
                variant="warning"
                onClick={fileUploadHandler()}
                className="btn btn-outline-dark rounded-pill"
              >
                Dodaj ofertę
              </Button>
            </div>
            <h6 className="text-center text-success display-6">
              {information}
            </h6>
          </Row>
        </Form>
      </Container>
    </section>
  );
}
