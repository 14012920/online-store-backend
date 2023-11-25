const Category = require("../model/CategoryModel");
const Hero = require("../model/HeroModel");

// Get All products

const get_category = async (req, res) => {
  console.log("req", req.body);
  try {
    const cats = await Category.find().populate('parent')
    if (cats.length) {
      res.status(200).json({ data: cats });
    } else {
      res.status(200).json({ data: cats, msg: "no cat" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
const get_hero_section = async (req, res) => {
    console.log("req", req.body);
    try {
      const heros = await Hero.find();
      if (heros.length) {
        res.status(200).json({ data: heros });
      } else {
        res.status(200).json({ data: heros, msg: "no cat" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };


module.exports = {
    get_category,
    get_hero_section
};
