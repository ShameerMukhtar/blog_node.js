const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "Home", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/Details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_create_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_create_delete,
};
