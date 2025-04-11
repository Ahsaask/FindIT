import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Blade4844912",
  database: "finditdb",
});

app.get("/", (req, res) => {
  res.json("hello from FindIt backend.");
});

// test out finder accounts first
app.get("/finder_accounts", (req, res) => {
  const q = "SELECT * FROM finder;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/finder_accounts", (req, res) => {
  const q = "INSERT INTO finder(`Password`, `Email`) VALUES (?)";

  // Use to test the post command to database
  // const values = [
  //   "testingPassword123", // Password as a varchar
  //   "testingemail@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.get("/owner_accounts", (req, res) => {
  const q = "SELECT * FROM owner;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});


app.get("/admin_accounts", (req, res) => {
  const q = "SELECT * FROM admin;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
    console.log("Connected to backend for FindIt.");
});