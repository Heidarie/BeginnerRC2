import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Sessions/Login/Login";
import Register from "./Sessions/Register/Register";
import ConfirmAccount from "./Sessions/ConfirmAccount";
import Dashboard from "./Components/Pages/Dashboard";
import ForgotPassword from "./Sessions/ForgotPassword";
import ConfirmNumber from "./Sessions/ConfirmNumber";
import NotFound from "./Components/Pages/NotFound";
import OfertyPracy from "./Components/Pages/OfertyPracy";
import AddOffer from "./Components/Pages/AddOffer";
import Offer from "./Components/Offers/Offer";
import ProfileWorker from "./Components/Pages/ProfileWorker";
import EditProfile from "./Components/Pages/EditProfile";
import Foremka from "./Components/Profiles/Forms/FormsExp";
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ConfirmNumber" element={<ConfirmNumber />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/OfertyPracy" element={<OfertyPracy />} />
        <Route path="/AddOffer" element={<AddOffer />} />
        <Route path="/Offer/:id" element={<Offer />} />
        <Route path="/User/:id" element={<ProfileWorker />} />
        <Route path="/User/Edit/:id" element={<EditProfile />} />
        <Route path="/Foremka" element={<Foremka />} />
        <Route path="/ConfirmAccount" element={<ConfirmAccount />} />
        <Route path="/VerifyAccount" element={<Foremka />} />
        <Route path="/DlaPracodawcow" />
        <Route path="/MapaPracy" />
        <Route path="/O-Nas" />
      </Routes>
    </React.Fragment>
  );
}

export default App;
