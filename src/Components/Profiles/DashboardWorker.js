import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";

function Profile({ userData }) {
  const [enableChange, setEnableChange] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  if (
    currentUser !== undefined &&
    userData !== undefined &&
    currentUser.id === userData.id
  ) {
    setEnableChange(true);
  }
  console.log(userData);
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
                  <h6 className="display-6">IMIE NAZWISKO</h6>
                </Col>
                <Col className="col-12 col-xxl-2"></Col>
                <Col className="col-12">
                  <h4 className="text-muted">EMAIL</h4>
                </Col>
                <Col className="col-12">
                  <p className="lead mb-0">JAKIES INNE DANE</p>
                </Col>
              </Row>
              {enableChange && (
                <Button variant="dark" href={`../User/${userData.id}/Edit`}>
                  Edytuj
                </Button>
              )}
            </Col>
          </Row>
          {enableChange && currentUser.user === 1 && (
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
          {enableChange && currentUser.user === 2 && (
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
