const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategory = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(allCategory);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const singleCategory = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  res.status(200).json(singleCategory);
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((category) => {
    return Product.findAll({ where: { product_id: req.params.id } });
  });
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  });
  res.json(deletedCategory);
});

module.exports = router;
