const User = require('../model/UserModal');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  console.log("register",req.body)
  let exist = await User.findOne({ email: req.body.email });
  if (exist) {
    res.status(401).json({ msg: 'user already exist' });
    return;
  }
  var encryptPassword = CryptoJS.AES.encrypt(
    req.body.password,
    'SunarBoy',
  ).toString();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: encryptPassword,
    isAdmin: req.body.isAdmin,
    mobile:req.body.mobile
  });
  try {
    const registeredUser = await newUser.save();
    res.status(201).json({ status:'S',desc:"register successfuly", data: registeredUser });
  } catch (error) {
    res.status(500).json({ status:'F', error: error });
  }
};

const login = async (req, res) => {
  let exist = await User.findOne({ email: req.body.email });
  if (!exist) {
    res.status(401).json({ msg: 'user not register' });
    return;
  }

  let decrptPassword = CryptoJS.AES.decrypt(
    exist.password,
    process.env.SECRET_KEY,
  ).toString(CryptoJS.enc.Utf8);

  const accessToken = jwt.sign(
    {
      id: exist._id,
      isAdmin: exist.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: '3d' },
  );
  if (decrptPassword != req.body.password) {
    res.status(401).json({ msg: 'wrong password' });
    return;
  }
  res.status(200).json({status:'S', data: exist, accessToken });
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY,
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  login,
  register,
  updateUser,
  deleteUser,
  getUser,
};
