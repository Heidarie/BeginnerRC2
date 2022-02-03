import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCameraRetro } from "react-icons/fa";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  console.log(user);
  const [information, setInformation] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);
  function fileUploadHandler() {
    setValue("userPicture", selectedImage);
    setValue("cvFile", selectedCV);
  }
  const { register, handleSubmit, setValue } = useForm();
  console.log(register);
  const { id } = useParams();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(data);
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("profession", data.profession);
    formData.append("aboutMe", data.aboutMe);
    formData.append("userExperience", data.userExperience);
    formData.append("cvFile", data.cvFile);
    formData.append("userPicture", data.userPicture);
    console.log(formData);
    const config = {
      headers: { Authorization: `Bearer ${currentUser.accessToken}` },
    };
    axios
      .post(
        `https://localhost:44310/User/EditUserProfile?userId=${id}`,
        formData,
        config
      )
      .then((response) => {
        console.log(response);
        setInformation(response.data);
        setTimeout(() => {
          navigate({ pathname: "/" });
        }, 3000);
      })
      .catch((err) => {
        setInformation("Coś poszło nie tak :/");
        console.log(err);
      });
  };
  function getUserLogged() {
    const config = {
      headers: { Authorization: `Bearer ${currentUser.accessToken}` },
    };
    axios
      .get(`https://localhost:44310/User/GetUserProfile?userId=${id}`, config)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserLogged();
  }, []);
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Link to={`/User/${id}`}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <Container className="col-5 d-flex justify-content-center align-items-center py-5 h-100">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row
            className="bg-warning bg-gradient p-2 "
            style={{
              borderRadius: "25px",
              boxShadow: "0px 15px 10px -15px #111",
            }}
          >
            <Col className="col-12 pt-2 text-center">
              <Row className="">
                <Col className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                  <Row>
                    <Col className="col-12 text-center justify-content-lg-start">
                      <h6 className="display-6">Zdjęcie</h6>
                    </Col>
                    <Col className="col-12 text-center justify-content-lg-start">
                      {user.userPictureConverted === "" ? (
                        <img
                          src={`data:image/png;base64,${user.userPictureConverted}`}
                          alt={user.name}
                          width={100}
                        />
                      ) : (
                        <FaCameraRetro style={{ fontSize: "50px" }} />
                      )}
                    </Col>
                    <Col className="col-12 text-center justify-content-start">
                      <input
                        type="file"
                        className="form-control-file rounded rounded-pill border border-dark text-center p-2"
                        id="exampleFormControlFile1"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                  <Row>
                    <Col className="col-12 text-center justify-content-lg-start">
                      <h6 className="display-6">CV (PDF)</h6>
                    </Col>
                    <Col className="col-12 text-center justify-content-lg-start">
                      <FaCameraRetro style={{ fontSize: "50px" }} />
                    </Col>
                    <Col className="col-12 text-center justify-content-start">
                      <input
                        type="file"
                        className="form-control-file rounded rounded-pill border border-dark text-center p-2"
                        id="exampleFormControlFile1"
                        onChange={(e) => setSelectedCV(e.target.files[0])}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12 justify-content-center justify-content-lg-start">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="display-6">Imię</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      defaultValue={user.name}
                      name="name"
                      placeholder="Imię"
                      className="rounded rounded-pill border border-light text-center"
                      {...register("name", {
                        required:
                          "Imię jest wymagane do poprawnej zmiany danych",
                        minLength: 3,
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 justify-content-center justify-content-lg-start">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="display-6">Nazwisko</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      defaultValue={user.surname}
                      name="surname"
                      placeholder="Nazwisko"
                      className="rounded rounded-pill border border-light text-center"
                      {...register("surname", {
                        required:
                          "Nazwisko jest wymagane do poprawnej zmiany danych",
                        minLength: 3,
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 justify-content-center justify-content-lg-start">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="display-6">Profesja</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      defaultValue={user.profession}
                      placeholder="Profesja"
                      className="rounded rounded-pill border border-light text-center"
                      {...register("profession", {
                        required:
                          "Profesja jest wymagane do poprawnej zmiany danych",
                        minLength: 3,
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 justify-content-center justify-content-lg-start">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="display-6">O mnie</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      defaultValue={user.aboutMe}
                      placeholder="O mnie"
                      className="rounded rounded-pill border border-light text-center"
                      {...register("aboutMe", {
                        required:
                          "'O mnie' jest wymagane do poprawnej zmiany danych",
                        minLength: 3,
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 justify-content-center justify-content-lg-start">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="display-6">Doświadczenie</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      defaultValue={user.userExperience}
                      placeholder="Doświadczenie"
                      className="rounded rounded-pill border border-light text-center"
                      {...register("userExperience", {
                        required:
                          "Krótka informacja o doświadczeniu jest wymagane do poprawnej zmiany danych",
                        minLength: 3,
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 justify-content-center justify-content-lg-start">
                  <Button
                    type="submit"
                    variant="warning"
                    onClick={fileUploadHandler()}
                    className="btn btn-outline-dark rounded-pill"
                  >
                    Zmień
                  </Button>
                  <h6 className="text-center text-success display-6">
                    {information}
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
}
