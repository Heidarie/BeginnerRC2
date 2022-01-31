import React, { useState, useEffect } from "react";
import { FloatingLabel, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { registerUser, registerEmployer } from "../../Redux/User/auth";
import { clearMessage } from "../../Redux/User/message";
const Register = () => {
  const [successful, setSuccessful] = useState("");
  const [information, setInformation] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    formState: { errors },
  } = useForm();
  const [radioValue, setRadioValue] = useState(1);
  const radios = [
    { name: "Pracownik", value: 1 },
    { name: "Pracodawca", value: 2 },
  ];

  const onSubmit = (data, e) => {
    setInformation("");
    setSuccessful("");
    setLoading(true);
    e.preventDefault();

    if (radioValue === 1) {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.email;
      const phoneNumber = data.phoneNumber;
      const passwordConfirm = data.passwordConfirm;
      const typeUser = data.typeUser;
      dispatch(
        registerUser({
          firstName,
          lastName,
          email,
          phoneNumber,
          passwordConfirm,
          typeUser,
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          setSuccessful(true);
          setInformation(
            "Udało się utworzyć konto, potwierdź je teraz emailem"
          );
          setTimeout(() => {
            navigate({ pathname: "/" });

            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          console.log("tutaj", error);
          setInformation("Użytkownik o takim emailu już istnieje");
          setSuccessful(false);
          setLoading(false);
        });
    } else {
      const name = data.name;
      const email = data.email;
      const phoneNumber = data.phoneNumber;
      const passwordConfirm = data.passwordConfirm;
      const typeUser = data.typeUser;
      dispatch(
        registerEmployer({
          name,
          email,
          phoneNumber,
          passwordConfirm,
          typeUser,
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          setSuccessful(true);
          setInformation(
            "Udało się utworzyć konto, potwierdź je teraz emailem"
          );
          setTimeout(() => {
            navigate({ pathname: "/" });

            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          console.log("tutaj", error);
          setInformation("Użytkownik o takim emailu już istnieje");
          setSuccessful(false);
          setLoading(false);
        });
    }
  };
  return (
    <section
      className="gradient-form rounded-25"
      style={{ backgroundColor: "#eee" }}
    >
      <Link to={"/"}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <h6>Beginner.pl</h6>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h2>Beginner.pl</h2>
                      <h4 className="mt-1 mb-5 pb-1">We are Beginner.pl</h4>
                    </div>
                    <div className="">
                      <Col className="col-12 text-center">
                        <ButtonGroup>
                          {radios.map((radio, idx) => (
                            <ToggleButton
                              key={idx}
                              id={`radio-${idx}`}
                              type="radio"
                              variant={
                                idx % 2 ? "outline-success" : "outline-danger"
                              }
                              name="radio"
                              value={radio.value}
                              checked={radioValue === radio.value}
                              className="rounded rounded-pill text-center ms-2"
                              onChange={(e) =>
                                setRadioValue(parseInt(e.currentTarget.value))
                              }
                            >
                              {radio.name}
                            </ToggleButton>
                          ))}
                        </ButtonGroup>
                      </Col>
                      {radioValue === 1 ? (
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingRegisterName"
                              label="Imie"
                              className="form-label"
                            >
                              <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Imie"
                                {...register("firstName", {
                                  required: true,
                                  maxLength: 20,
                                  pattern: /^[A-Za-z]+$/i,
                                })}
                              />
                              {errors?.firstName?.type === "required" && (
                                <p>To pole jest wymagane</p>
                              )}
                              {errors?.firstName?.type === "maxLength" && (
                                <p>Imię nie może być dłuższe niż 20 znaków</p>
                              )}
                              {errors?.firstName?.type === "pattern" && (
                                <p>Tylko litery mogą znależć się w imieniu</p>
                              )}
                            </FloatingLabel>
                          </div>

                          <div className="form-outline mb-4 ">
                            <FloatingLabel
                              controlId="floatingRegisterSecondName"
                              label="Nazwisko"
                              className="form-label"
                            >
                              <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Nazwisko"
                                {...register("lastName", {
                                  required: true,
                                })}
                              />
                              {errors?.firstName?.type === "required" && (
                                <p>To pole jest wymagane</p>
                              )}
                            </FloatingLabel>
                          </div>
                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingRegisterEmail"
                              label="Email"
                              className="form-label"
                            >
                              <Form.Control
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                {...register("email", {
                                  required: true,
                                })}
                              />
                              {errors?.email?.type === "required" && (
                                <p>To pole jest wymagane</p>
                              )}
                            </FloatingLabel>
                          </div>
                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingPhoneNumber"
                              label="Numer telefonu"
                              className="form-label"
                            >
                              <Form.Control
                                type="number"
                                className="form-control"
                                placeholder="+48123456789"
                                {...register("phoneNumber", {
                                  required: true,
                                })}
                              />
                              {errors?.phoneNumber?.type === "required" && (
                                <p>To pole jest wymagane</p>
                              )}
                            </FloatingLabel>
                          </div>
                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingRegisterPassword"
                              label="Hasło"
                              className="form-label"
                            >
                              <Form.Control
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                {...register("password", {
                                  required: "Hasło jest wymagane",
                                  pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/i,
                                  minLength: 6,
                                  maxLength: 20,
                                })}
                              />
                              {errors?.password?.type === "minLength" && (
                                <p>Hasło nie może być krótsze niż 6 znaków</p>
                              )}
                              {errors?.password?.type === "maxLength" && (
                                <p>Hasło nie może być dłuższe niż 20 znaków</p>
                              )}
                              {errors?.password?.type === "pattern" && (
                                <p>
                                  Hasło musi składać się z conajmniej 1 cyfry i
                                  1 dużej litery
                                </p>
                              )}
                              {errors.password && (
                                <p style={{ color: "red" }}>
                                  {errors.password.message}
                                </p>
                              )}
                            </FloatingLabel>
                          </div>
                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingRegisterPasswordConfirm"
                              label="Potwierdź hasło"
                              className="form-label"
                            >
                              <Form.Control
                                type="password"
                                className="form-control"
                                placeholder="Password Confirm"
                                {...register("passwordConfirm", {
                                  required: "Wymagane jest potwierdzenie hasła",
                                  validate: {
                                    matchesPreviousPassword: (value) => {
                                      const { password } = getValues();
                                      return (
                                        password === value ||
                                        "Hasła muszą się zgadzać"
                                      );
                                    },
                                  },
                                })}
                              />
                              {errors.passwordConfirm && (
                                <p style={{ color: "red" }}>
                                  {errors.passwordConfirm.message}
                                </p>
                              )}
                            </FloatingLabel>
                          </div>
                          {setValue("typeUser", radioValue)}
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-primary btn-block fa-lg gradient-custom-3 mb-3"
                              type="submit"
                            >
                              {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                              )}
                              Zarejestruj się
                            </button>
                            <div>
                              {successful === false && (
                                <div className="form-group">
                                  <div
                                    className="alert alert-danger"
                                    role="alert"
                                  >
                                    <small>{information}</small>
                                  </div>
                                </div>
                              )}
                              {successful === true && (
                                <div className="form-group">
                                  <div
                                    className="alert alert-success"
                                    role="alert"
                                  >
                                    <small>{information}</small>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Posiadasz już konto?</p>
                            <Link
                              type="button"
                              className="btn btn-outline-danger"
                              to="/Login"
                            >
                              Zaloguj się
                            </Link>
                          </div>
                        </Form>
                      ) : (
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-outline mb-4 ">
                            <FloatingLabel
                              controlId="floatingRegisterSecondName"
                              label="Nazwa Firmy"
                              className="form-label"
                            >
                              <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Nazwisko"
                                {...register("name", {
                                  required: true,
                                })}
                              />
                              {errors?.firstName?.type === "required" && (
                                <p>To pole jest wymagane</p>
                              )}
                            </FloatingLabel>
                          </div>
                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingRegisterEmail"
                              label="Email"
                              className="form-label"
                            >
                              <Form.Control
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                {...register("email", {
                                  required: true,
                                })}
                              />
                              {errors?.email?.type === "required" && (
                                <p>To pole jest wymagane</p>
                              )}
                            </FloatingLabel>
                          </div>
                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingPhoneNumber"
                              label="Numer telefonu"
                              className="form-label"
                            >
                              <Form.Control
                                type="number"
                                className="form-control"
                                placeholder="+48123456789"
                                {...register("phoneNumber", {
                                  required: true,
                                })}
                              />
                              {errors?.phoneNumber?.type === "required" && (
                                <p>To pole jest wymagane</p>
                              )}
                            </FloatingLabel>
                          </div>

                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingRegisterPassword"
                              label="Hasło"
                              className="form-label"
                            >
                              <Form.Control
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                {...register("password", {
                                  required: "Hasło jest wymagane",
                                  pattern:
                                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$",
                                  minLength: 6,
                                  maxLength: 20,
                                })}
                              />
                              {errors?.password?.type === "minLength" && (
                                <p>Hasło nie może być krótsze niż 6 znaków</p>
                              )}
                              {errors?.password?.type === "maxLength" && (
                                <p>Hasło nie może być dłuższe niż 20 znaków</p>
                              )}
                              {errors?.password?.type === "pattern" && (
                                <p>
                                  Hasło musi składać się z conajmniej 1 cyfry i
                                  jednej dużej litery
                                </p>
                              )}
                              {errors.password && (
                                <p style={{ color: "red" }}>
                                  {errors.password.message}
                                </p>
                              )}
                            </FloatingLabel>
                          </div>
                          <div className="form-outline mb-4">
                            <FloatingLabel
                              controlId="floatingRegisterPasswordConfirm"
                              label="Potwierdź hasło"
                              className="form-label"
                            >
                              <Form.Control
                                type="password"
                                className="form-control"
                                placeholder="Password Confirm"
                                {...register("passwordConfirm", {
                                  required: "Wymagane jest potwierdzenie hasła",
                                  validate: {
                                    matchesPreviousPassword: (value) => {
                                      const { password } = getValues();
                                      return (
                                        password === value ||
                                        "Hasła muszą się zgadzać"
                                      );
                                    },
                                  },
                                })}
                              />
                              {errors.passwordConfirm && (
                                <p style={{ color: "red" }}>
                                  {errors.passwordConfirm.message}
                                </p>
                              )}
                            </FloatingLabel>
                          </div>
                          {setValue("typeUser", radioValue)}
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-primary btn-block fa-lg gradient-custom-3 mb-3"
                              type="submit"
                            >
                              {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                              )}
                              Zarejestruj się
                            </button>
                            <div>
                              {successful === false && (
                                <div className="form-group">
                                  <div
                                    className="alert alert-danger"
                                    role="alert"
                                  >
                                    <small>{information}</small>
                                  </div>
                                </div>
                              )}
                              {successful === true && (
                                <div className="form-group">
                                  <div
                                    className="alert alert-success"
                                    role="alert"
                                  >
                                    <small>{information}</small>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Posiadasz już konto?</p>
                            <Link
                              type="button"
                              className="btn btn-outline-danger"
                              to="/Login"
                            >
                              Zaloguj się
                            </Link>
                          </div>
                        </Form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
