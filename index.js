const path = require("path");
const express = require("express");
const sessions = require("express-session");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

// --- Body parsers (HTML vormid + JSON) ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// --- Sessioonid ---
app.use(
  sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

// --- Statilised ressursid (CSS/JS/pildid) ---
app.use(express.static(path.join(__dirname, "public")));

// --- Handlebars view engine ---
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    helpers: {
      eq: (a, b) => a === b,
      // Lihtne lõikaja; kui ei soovi, võid eemaldada
      truncate: (str, n) =>
        str && str.length > n ? str.slice(0, n) + "…" : str,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// --- Globaalne locals (nt aasta) ---
app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  next();
});

// --- Routes ---
const articleRoutes = require("./routes/article");
app.use("/", articleRoutes);

const authorRoutes = require("./routes/author");
app.use("/", authorRoutes);

const userRoutes = require("./routes/users");
app.use("/", userRoutes);

// (Soovi korral: kui sul pole avalehe route'i, võid siia lisada renderi või redirect'i)
// app.get('/', (req, res) => res.redirect('/articles'));

app.listen(3025, () => {
  console.log("Server is running on port 3025");
});
