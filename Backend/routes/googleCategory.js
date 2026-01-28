const router = require("express").Router();
const GoogleCategory = require("../models/GoogleCategory");
router.get("/root", async (req, res) => {
  try {
    const data = await GoogleCategory
      .find({ parent_id: null })
      .sort({ name: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/children/:parentId", async (req, res) => {
  try {
    const data = await GoogleCategory
      .find({ parent_id: req.params.parentId })
      .sort({ name: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
