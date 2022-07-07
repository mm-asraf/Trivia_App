const express = require("express");
const router = express.Router();
const Score = require("../models/score.model");

//crud

router.post("", async (req, res) => {
  try {
    const score = await Score.create(req.body);
    return res.status(201).send(score);
  } catch (err) {
    return res.status(500).json({ err: err.message, status: "failed" });
  }
});

router.get("", async (req, res) => {
  try {
    const score = await Score.find().lean().exec();
    return res.status(200).send(score);
  } catch (err) {
    return res.status(200).json({ err: err.message, status: "failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const score = await Score.findById(req.params.id, req.body, { new: true })
      .lean()
      .exec();
    return res.status(200).send(score);
  } catch (err) {
    return res.status(200).json({ err: err.message, status: "failed" });
  }
});

router.delete("", async (req, res) => {
  try {
    const score = await Score.findByIdAndDelete(req.params.id);
    return res.status(200).send(score);
  } catch (err) {
    return res.status(200).json({ err: err.message, status: "failed" });
  }
});

module.exports = router;
