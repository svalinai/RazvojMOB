const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt"); // Dodaj bcrypt za hashiranje lozinki
const app = express();
const port = 4444;

// Parser za JSON podatke
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Omogućavanje CORS-a
app.use(cors());

// Kreiranje konekcije prema bazi podataka
const connection = mysql.createConnection({
  host: "student.veleri.hr",
  user: "fgunja",
  password: "11",
  database: "fgunja",
});

// Povezivanje sa bazom
connection.connect(function (err) {
  if (err) {
    console.error("Greška prilikom povezivanja sa bazom:", err);
    throw err;
  }
  console.log("Povezano sa bazom!");
});

app.post("/recenzije", (req, res) => {
  const { ime_korisnika, tekst_recenzije } = req.body;
  const sql =
    "INSERT INTO recenzijeMOB (ime_korisnika, tekst_recenzije) VALUES (?, ?)";
  connection.query(sql, [ime_korisnika, tekst_recenzije], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("Recenzija dodana.");
  });
});

// Register API ruta
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Sva polja su obavezna!" });
  }

  // Provera da li korisničko ime ili email već postoji
  const checkQuery =
    "SELECT * FROM korisniciMOB WHERE username = ? OR email = ?";
  connection.query(checkQuery, [username, email], (err, results) => {
    if (err) {
      console.error("Greška pri provjeri korisnika:", err);
      return res
        .status(500)
        .json({ success: false, message: "Greška na serveru." });
    }

    if (results.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Korisničko ime ili email već postoje!",
      });
    }

    // Heširanje lozinke
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Greška pri heširanju lozinke:", err);
        return res
          .status(500)
          .json({ success: false, message: "Greška na serveru." });
      }

      // Unos novog korisnika u bazu
      const query =
        "INSERT INTO korisniciMOB (username, email, password) VALUES (?, ?, ?)";
      connection.query(
        query,
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Greška pri unosu u bazu:", err);
            return res
              .status(500)
              .json({ success: false, message: "Greška na serveru." });
          }

          res.json({
            success: true,
            message: "Korisnik uspješno registrovan!",
          });
        }
      );
    });
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Molimo unesite korisničko ime i lozinku." });
  }

  // Provjera korisnika u bazi podataka
  const query = "SELECT * FROM korisniciMOB WHERE username = ?";
  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error("Greška prilikom pretrage korisnika:", err);
      return res.status(500).json({ error: "Greška na serveru." });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ error: "Neispravno korisničko ime ili lozinka." });
    }

    const user = results[0];

    // Provjera lozinke
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Greška prilikom usporedbe lozinke:", err);
        return res.status(500).json({ error: "Greška na serveru." });
      }

      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Neispravno korisničko ime ili lozinka." });
      }

      // Uspješna prijava
      res.status(200).json({ message: "Prijava uspješna." });
    });
  });
});

app.get("/api/predmeti", (req, res) => {
  const sql = "SELECT * FROM itemiMOB";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Greška pri dohvaćanju predmeta:", err.message);
      return res.status(500).send("Greška pri dohvaćanju podataka.");
    }
    res.json(results);
  });
});

app.post("/api/slike", (req, res) => {
  const { slika_base64 } = req.body;

  // Provjera da je slika poslana
  if (!slika_base64) {
    return res
      .status(400)
      .json({ error: "Parametar slika_base64 je obavezan." });
  }

  // SQL upit za umetanje slike
  const query = `
    INSERT INTO slike (slika_base64)
    VALUES (?)
  `;

  // Pokretanje upita
  connection.query(query, [slika_base64], (err, results) => {
    if (err) {
      console.error("Greška prilikom dodavanja slike:", err.message);
      return res.status(500).json({ error: "Greška na serveru." });
    }

    // Vraćanje ID-a novo dodane slike
    res.status(201).json({ id_slike: results.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log("Server running at port: " + port);
});
