var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/references", (req, res) => {
  res.json([1,2,3]);
});

module.exports = router;
