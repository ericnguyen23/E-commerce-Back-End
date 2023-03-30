const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: "product" }],
  });
  res.status(200).json(allTags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const singleTag = await Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag, as: "product" }],
  });
  res.status(200).json(singleTag);
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((tag) => {
    return ProductTag.findAll({ where: { product_id: req.params.id } });
  });
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    },
  });
  res.json(deletedTag);
});

module.exports = router;
