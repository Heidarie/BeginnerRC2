import axios from "axios";

const API_URL = "https://localhost:44310/Account/";
const configRegister = {
  headers: { "Content-Type": "multipart/form-data" },
};
const configLogin = {
  headers: { "Content-Type": "application/json" },
};
const registerUser = (
  firstName,
  lastName,
  email,
  phoneNumber,
  passwordConfirm,
  typeUser
) => {
  let formData = new FormData();
  formData.append("Name", firstName);
  formData.append("Surname", lastName);
  formData.append("Username", email);
  formData.append("Email", email);
  formData.append("PhoneNumber", phoneNumber);
  formData.append("Password", passwordConfirm);
  formData.append("Role", typeUser);
  formData.append("Profession", typeUser);
  console.log(formData);
  const xd = axios.post(API_URL + "Register", formData, configRegister);
  console.log(xd);
};

const login = (email, password) => {
  let formData = { email: email, password: password };
  return axios
    .post(API_URL + "Login", formData, configLogin)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  login,
  logout,
};

export default authService;
