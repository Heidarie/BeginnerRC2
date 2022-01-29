import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Profil() {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    navigate("/");
  }
  return <div>TO JEST TWOJ PROFIL</div>;
}
