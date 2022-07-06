const { Schema, model } = require("mongoose");

const scoreSchema = new Schema(
  {
    scored: { type: String, type: Number },
    category: { type: String, type: String },
    player: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("score", scoreSchema);
