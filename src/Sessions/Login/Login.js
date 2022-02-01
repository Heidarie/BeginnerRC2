import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FloatingLabel, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/User/auth";
import { clearMessage } from "../../Redux/User/message";

const Login = (setUser) => {
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState("");
  const [information, setInformation] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setSuccessful("");
    setInformation("");
    setLoading(true);

    dispatch(login({ email: data.email, password: data.password }))
      .unwrap()
      .then((res) => {
        setSuccessful(true);
        setInformation("Udało się zalogować!");
        window.location.reload();
      })
      .catch((error) => {
        setSuccessful(false);
        setInformation("Błędne hasło lub email.");
        setLoading(false);
      });
  };
  if (isLoggedIn) {
    navigate("/");
  }

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
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h2>Beginner.pl</h2>
                      <h4 className="mt-1 mb-5 pb-1">We are Beginner.pl</h4>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p className="text-center">Logowanie do konta</p>

                      <div className="form-outline mb-4">
                        <FloatingLabel
                          controlId="floatingLoginEmail"
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
                            <p>Email jest wymagany</p>
                          )}
                        </FloatingLabel>
                      </div>

                      <div className="form-outline mb-4">
                        <FloatingLabel
                          controlId="floatingPasswordEmail"
                          label="Password"
                          className="form-label"
                        >
                          <Form.Control
                            type="password"
                            className="form-control"
                            placeholder="name@example.com"
                            {...register("password", {
                              required: "Hasło jest wymagane",
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
                          {errors.password && (
                            <p style={{ color: "red" }}>
                              {errors.password.message}
                            </p>
                          )}
                        </FloatingLabel>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-3 mb-3"
                          type="submit"
                        >
                          {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          Zaloguj się
                        </button>

                        {successful === false && (
                          <Col
                            className="col-12 text-center alert alert-danger"
                            role="alert"
                          >
                            <small>{information}</small>
                          </Col>
                        )}
                        {successful === true && (
                          <Col
                            className="col-12 text-center alert alert-success"
                            role="alert"
                          >
                            <small>{information}</small>
                          </Col>
                        )}
                        <Link className="text-muted" to="/ForgotPassword">
                          Zapomniałeś hasła?
                        </Link>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Nie posiadasz konta?</p>
                        <Link
                          type="button"
                          className="btn btn-outline-danger"
                          to="/Register"
                        >
                          Stwórz konto
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
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
export default Login;
