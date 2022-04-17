const { User } = require("../models/index");

const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return [newUser, null];
  } catch (err) {
    return [null, err.message];
  }
};

const getUser = async (query) => {
  try {
    const user = await User.find(query);
    return [user, null];
  } catch (err) {
    return [null, err.message];
  }
};

const deleteUser = async (query) => {
  try {
    const user = await User.findOneAndDelete({ name: query });
    return [user, null];
  } catch (err) {
    return [null, err.message];
  }
};

module.exports = { createUser, getUser, deleteUser };
