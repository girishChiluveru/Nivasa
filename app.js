const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');

const listingsRoutes = require('./routes/listings.js');
const reviewsRoutes = require('./routes/reviews.js');

const MONGO_URL = "mongodb://localhost:27017/wander-lust";

// --- Database Connection ---
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

// --- App Configuration ---
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// --- Session & Flash Setup ---
const sessionOptions = {
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
};
app.use(session(sessionOptions));
app.use(flash());

// ✅ Make flash messages globally available (this must come before routes)
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// --- Routes ---
app.get("/", (req, res) => res.send("working"));
app.use('/listings', listingsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/listings/:id/reviews', reviewsRoutes);

// --- Error Handling ---
app.all('/*catchall', (req, res, next) => {
  next(new ExpressError(404, "Page not found!!"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  console.log("---Error---",req.method,req.path, status, message);
  res.status(status).render("error.ejs", { message });
});

// --- Server Start ---
app.listen(8080, () => {
  console.log("Listening at port 8080");
});
