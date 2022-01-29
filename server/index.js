const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.listen(5000, () => {
  console.log("Server up and running");
});
app.use(express.json());
app.use(cors());
//Łącznie się z bazą danych BEGINNER
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "Beginner",
});
//Sprawdzenie czy połączenie działa

// RACZEJ TO NIE BEDZIE UZYWANE
//Dodawanie nowego użytkownika
app.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const number = req.body.number;
  const email = req.body.email;
  const password = req.body.password;
  db.query("INSERT INTO users (email, password) VALUES (?,?)", [
    email,
    password,
    (err, result) => {
      console.log(err);
    },
  ]);
  db.query(
    "INSERT INTO person (name,surname,number,profession_id) VALUES (?,?,?,?)",
    [
      firstName,
      lastName,
      number,
      profession_id,
      (err, result) => {
        console.log(err);
      },
    ]
  );
});
app.get("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [
    email,
    password,
    (err, result) => {
      if (err) {
        console.log({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Błędny email lub hasło" });
      }
    },
  ]);
});
