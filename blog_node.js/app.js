const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const app = express();
// Connect to Mongodb
//Add your Connection String
const dbURI = "";
mongoose
  .connect(dbURI)
  .then((result) => {
    //console.log(result);
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
// view engine

app.set("view engine", "ejs");

app.listen(4000);
// middle for static files

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//creating a middlewere
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("Hello Shameer");
//   next();
// });

// Handle Requests
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
// blog routes
//app.use(blogRoutes);
app.use("/blogs", blogRoutes);
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
