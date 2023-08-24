const User = require("./Users");

const registerUser = (userData) => {
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

const findOneAndUpdate = (id, userData) => {
  return User.findOneAndUpdate(id, userData);
}

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
}

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  findByIdAndUpdate,
  findOneAndUpdate,
  deleteUser,
};
