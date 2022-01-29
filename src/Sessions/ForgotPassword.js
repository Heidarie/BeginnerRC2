import React from "react";
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    alert(JSON.stringify(data));
    e.target.reset();
    navigate({ pathname: "/Login" });
  };
  return (
    <section
      className="gradient-form rounded-25"
      style={{ backgroundColor: "#eee" }}
    >
      <Link to={"/Login"}>
        <BiArrowBack className="back-arrow" />
      </Link>
      <div className="container w-50 py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-10 w-75">
            <div className="card rounded-3 text-black">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center">
                  <h2>Zapomniałeś hasła?</h2>
                  <h6 className="mt-1 mb-5 pb-1 ">
                    Podaj email, aby zrestartować hasło
                  </h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                        <p>To pole jest wymagane</p>
                      )}
                    </FloatingLabel>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-primary btn-block fa-lg gradient-custom-3 mb-3"
                      type="submit"
                    >
                      Zrestartuj hasło
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
