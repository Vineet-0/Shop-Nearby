const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id)
    .exec()
    .then((cate) => {
      req.category = cate;
      next();
    })
    .catch((err) => {
      res.status(400).json({
        error: "Category not found in DB",
      });
    });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((category) => {
      res.json({ category });
    })
    .catch((err) => {
      res.status(400).json({
        error: "Not able to save category in DB",
      });
    });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find()
    .exec()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(400).json({
        error: "No categories found",
      });
    });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category
    .save()
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Failed to update category",
      });
    });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category
    .deleteOne()
    .then((category) => {
      res.json({
        message: "Successfully deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: "Failed to delete category",
      });
    });
};
