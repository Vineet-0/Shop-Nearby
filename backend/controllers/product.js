const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { log } = require("console");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec()
    .then((product) => {
      req.product = product;
      next();
    })
    .catch((err) => {
      res.status(400).json({
        error: "Product not found",
      });
    });
};

exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // destructure the fields
    const { price, name, description, category, stock } = fields;
    if (!name || !description || !category || !stock || !price) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    // handel file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the DB
    product
      .save()
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        res.status(400).json({
          error: "Saving tshirt in DB failed",
        });
      });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product
    .deleteOne()
    .then((deletedProduct) => {
      res.json({
        message: "Deletion was a success",
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: "failed to delete the product",
      });
    });
};

exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // updation code
    let product = req.product;
    product = _.extend(product, fields);

    // handel file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the DB
    product
      .save()
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        res.status(400).json({
          error: "Updation of product in DB failed",
        });
      });
  });
};

// product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(400).json({
        error: "No product found",
      });
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {})
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.status(400).json({
        error: "No category found",
      });
    });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {})
    .then((products) => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        error: "Bulk operations failed",
      });
    });

  next();
};
