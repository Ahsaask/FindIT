import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { use } from "react";

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

// get specific finder account user
// check if it still returns null might be helpful
  // check if null deny access to webpage, else login
app.post("/finder_account", (req, res) => {
  const q = "SELECT * FROM finder WHERE Password = ? AND Email = ?";

  // test with existing account
  // const values = [
  //   "finder123", // Password as a varchar
  //   "finder1@example.com", // Email as a varchar
  // ];

  // test with non-existing account
  // const values = [
  //   "finder123nonexist", // Password as a varchar
  //   "findernotexist1@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({ success: true, user: data[0] });
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

app.post("/owner_account", (req, res) => {
  const q = "SELECT * FROM owner WHERE Password = ? AND Email = ?";

  // test with existing account
  // const values = [
  //   "owner123", // Password as a varchar
  //   "owner1@example.com", // Email as a varchar
  // ];

  // test with non-existing account
  // const values = [
  //   "owner123nonexist", // Password as a varchar
  //   "ownernotexist1@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({ success: true, user: data[0] });
  });
});


app.post("/owner_accounts", (req, res) => {
  const q = "INSERT INTO owner(`Password`, `Email`) VALUES (?)";

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

app.post("/check_account", (req, res) => {
  const email = req.query.email;
  const q = `SELECT Email FROM finder WHERE Email = ?
             UNION
             SELECT Email FROM owner WHERE Email = ?
             UNION
             SELECT Email FROM admin WHERE Email = ?`;

  const values = [email, email, email];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (data.length > 0) {
      return res.json({ exists: true });
    }

    return res.json({ exists: false });
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

app.post("/admin_account", (req, res) => {
  const q = "SELECT * FROM owner WHERE Password = ? AND Email = ?";

  // test with existing account
  // const values = [
  //   "admin123", // Password as a varchar
  //   "admin1@example.com", // Email as a varchar
  // ];

  // test with non-existing account
  // const values = [
  //   "admin123nonexist", // Password as a varchar
  //   "adminnotexist1@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({ success: true, user: data[0] });
  });
});

app.post("/admin_accounts", (req, res) => {
  const q = "INSERT INTO admin(`Password`, `Email`) VALUES (?)";

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

app.get("/lost_items", (req, res) => {
  const q = `SELECT Description, Name, Status, Date, Floor_number, Location_Name, Address 
             FROM finditdb.lost_item 
             JOIN finditdb.location ON lost_item.Location_id = location.Location_id`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    return res.json(data);
  });
});

app.get("/claim_items", (req, res) => {
  const q = "SELECT * FROM finditdb.claim";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    return res.json(data);
  });
});

app.post("/get_user_profile", (req, res) => {
  const q = `SELECT profile.Mobile_no, Bio, Image, First_name, Last_name
            FROM finditdb.finder
            JOIN finditdb.finder_name ON finder_name.Finder_ID_number = finder.Finder_ID_number
            JOIN finditdb.profile ON finder_name.Mobile_no = profile.Mobile_no
            WHERE finder.Finder_ID_number = ?

            UNION

            SELECT profile.Mobile_no, Bio, Image, First_name, Last_name
            FROM finditdb.owner
            JOIN finditdb.owner_name ON owner_name.Owner_ID_number = owner.Owner_ID_number
            JOIN finditdb.profile ON owner.Mobile_no = profile.Mobile_no
            WHERE owner.Owner_ID_number = ?`;

  const values = [
    req.body.Finder_ID_number,
    req.body.Owner_ID_number // Same ID used for both
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    return res.json({ success: true, user: data[0] });
  });
});

app.listen(8800, () => {
    console.log("Connected to backend for FindIt.");
});