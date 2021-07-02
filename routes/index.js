const express = require("express");
const router = express.Router();

const myDb = require("../db/mySqliteDB.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.redirect("/references");
});

// http://localhost:3000/references?pageSize=24&page=3&q=John
router.get("/references", async (req, res, next) => {
  const query = req.query.q || "";
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 24;
  const msg = req.query.msg || null;
  try {
    let total = await myDb.getReferencesCount(query);
    let references = await myDb.getReferences(query, page, pageSize);
    res.render("./pages/index", {
      references,
      query,
      msg,
      currentPage: page,
      lastPage: Math.ceil(total/pageSize),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/createReference", async (req, res, next) => {
  const ref = req.body;

  try {
    const insertRes = await myDb.insertReference(ref);

    console.log("Inserted", insertRes);
    res.redirect("/references/?msg=Inserted");
  } catch (err) {
    console.log("Error inserting", err);
    next(err);
  }
});

module.exports = router;
