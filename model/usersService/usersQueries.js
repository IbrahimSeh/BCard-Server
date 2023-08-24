const config = require("config");
const usersServiceMongo = require("../mongodb/users/usersService");
const dbOption = config.get("dbOption");

const registerUser = (userData) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.registerUser(userData);
  }
};

const getUserByEmail = (email) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserByEmail(email);
  }
};

const getAllUsers = () => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getAllUsers();
  }
};

const getUserById = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserById(id);
  }
};

const findByIdAndUpdate = (id, userData) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.findByIdAndUpdate(id, userData);
  }
}

const findOneAndUpdate = (id, userData) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.findOneAndUpdate(id, userData);
  }
}

const deleteUser = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.deleteUser(id);
  }
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
