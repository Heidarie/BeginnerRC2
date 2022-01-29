import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const ConfirmNumber = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    const code =
      data["firstDigit"] +
      data["secondDigit"] +
      data["thirdDigit"] +
      data["fourthDigit"];
    e.preventDefault();
    alert(JSON.stringify(code));
    e.target.reset();
    navigate({ pathname: "/Login" });
  };
  return (
    <section
      className="gradient-form rounded-25"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-10 w-75">
            <div className="card rounded-3 text-black">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center">
                  <h2>Potwierdź numer telefonu</h2>
                  <h6 className="mt-1 mb-5 ">
                    Podaj kod wysłany na numer - +48 5** *** **2
                  </h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-outline d-flex mb-4">
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="input1"
                      maxLength="1"
                      {...register("firstDigit", {
                        required: true,
                        maxLength: 1,
                      })}
                    />
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="input2"
                      maxLength="1"
                      {...register("secondDigit", {
                        required: true,
                        maxLength: 1,
                      })}
                    />
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="input3"
                      maxLength="1"
                      {...register("thirdDigit", {
                        required: true,
                        maxLength: 1,
                      })}
                    />
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="input4"
                      maxLength="1"
                      {...register("fourthDigit", {
                        required: true,
                        maxLength: 1,
                      })}
                    />
                  </div>
                  {errors?.firstDigit?.type === "required" && (
                    <p>Te pole są wymagane</p>
                  )}
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-primary fa-lg mb-3"
                      type="submit"
                    >
                      Zweryfikuj Numer
                    </button>
                  </div>
                  <div className="mt-3 content d-flex justify-content-center align-items-center">
                    <span>Nie dostałeś kodu?</span>
                    <a
                      href="https://www.google.com/"
                      className="text-decoration-none ms-3"
                    >
                      Wyślij ponownie(1/3)
                    </a>
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
export default ConfirmNumber;
