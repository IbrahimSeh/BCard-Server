const User = require("./Users");

const registerUser = (userData) => {
  // console.log('userData = ', userData);
  const user = new User(userData);
  return user.save();
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getAllUsers = () => {
  return User.find();
};

const getUserById = (id) => {
  return User.findById(id);
}

const findByIdAndUpdate = (id, userData) => {
  return User.findByIdAndUpdate(id, userData);
}

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  findByIdAndUpdate,
};
