import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
function Profile() {
  const { id } = useParams();
  const [enableChange, setEnableChange] = useState(false);
  const [user, setUser] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  function getUser() {
    axios
      .get(`https://localhost:44310/User/GetUserProfile?userId=${id}`)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
    if (user === null) {
      getUser();
    } else {
      console.log("TUTAJ");
      getUserLogged();
    }
  }, [id, currentUser.user]);
  console.log(user);
  return (
    <div>
      <div className="Profile_Section">
        <div className="Profile_Wrapper">
          <Row
            className="bg-warning bg-gradient"
            style={{
              borderRadius: "25px",
              boxShadow: "0px 15px 10px -15px #111",
              minHeight: "200px",
            }}
          >
            <Col className="col-3 d-flex ps-4 align-items-center justify-content-center">
              ZDJECIE
            </Col>
            <Col className="col-9 text-start pt-2">
              <Row>
                <Col className="col-12 col-xxl-10">
                  <h6 className="display-6">
                    {user.name + " " + user.surname}
                  </h6>
                </Col>
                <Col className="col-12 col-xxl-2"></Col>
                <Col className="col-12">
                  <h4 className="text-muted">{user.email}</h4>
                </Col>
                <Col className="col-12">
                  <p className="lead mb-0">JAKIES INNE DANE</p>
                </Col>
              </Row>
              {user.isUserMainAccount && (
                <Button variant="dark" href={`../User/Edit/${id}`}>
                  Edytuj
                </Button>
              )}
            </Col>
          </Row>
          {user.isUserMainAccount && currentUser.userRole === "Employee" && (
            <div>
              <h1 className="display-6 text-muted text-center pt-3">
                Twoje aplikacje
              </h1>
              <div className="Profile_Options">
                <div className="Profile_Options-MyAplication">
                  <p className="display-6 text-muted">WSB</p>
                  <img
                    className="Profile_Options-Image"
                    src="https://tipsmake.com/data0/mimages/Wage-And-Hour-Disputes-How-To-Get-Paid-For-Working-Overtime-2.jpg"
                    alt="logo"
                  />
                  <button className="bg-danger">ODRZUCONO</button>
                </div>
                <div className="Profile_Options-MyAplication">
                  <p className="display-6 text-muted">POSNANIA</p>
                  <img
                    className="Profile_Options-Image"
                    src="https://tipsmake.com/data0/mimages/Wage-And-Hour-Disputes-How-To-Get-Paid-For-Working-Overtime-2.jpg"
                    alt="logo"
                  />
                  <button className="bg-success">ZAAKCEPTOWANO</button>
                </div>
                <div className="Profile_Options-MyAplication">
                  <p className="display-6 text-muted">ZABKA</p>
                  <img
                    className="Profile_Options-Image"
                    src="https://tipsmake.com/data0/mimages/Wage-And-Hour-Disputes-How-To-Get-Paid-For-Working-Overtime-2.jpg"
                    alt="logo"
                  />
                  <button className="bg-danger">ODRZUCONO</button>
                </div>
              </div>
            </div>
          )}
          {user.isUserMainAccount && currentUser.userRole === "Employer" && (
            <div>
              <h1 className="display-6 text-muted text-center pt-3">
                MOJE OFERTY
              </h1>
              <div className="Profile_Options">
                <div className="Profile_Options-MyAplication">
                  <p className="display-6 text-muted">WSB</p>
                  <img
                    className="Profile_Options-Image"
                    src="https://tipsmake.com/data0/mimages/Wage-And-Hour-Disputes-How-To-Get-Paid-For-Working-Overtime-2.jpg"
                    alt="logo"
                  />
                  <button className="bg-danger">ODRZUCONO</button>
                </div>
                <div className="Profile_Options-MyAplication">
                  <p className="display-6 text-muted">POSNANIA</p>
                  <img
                    className="Profile_Options-Image"
                    src="https://tipsmake.com/data0/mimages/Wage-And-Hour-Disputes-How-To-Get-Paid-For-Working-Overtime-2.jpg"
                    alt="logo"
                  />
                  <button className="bg-success">ZAAKCEPTOWANO</button>
                </div>
                <div className="Profile_Options-MyAplication">
                  <p className="display-6 text-muted">ZABKA</p>
                  <img
                    className="Profile_Options-Image"
                    src="https://tipsmake.com/data0/mimages/Wage-And-Hour-Disputes-How-To-Get-Paid-For-Working-Overtime-2.jpg"
                    alt="logo"
                  />
                  <button className="bg-danger">ODRZUCONO</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
