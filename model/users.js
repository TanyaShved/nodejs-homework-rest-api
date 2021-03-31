const User = require('./schemas/user')

const findByEmail = async (email) => {
    return await User.findOne({ email })
}

const findById = async (id) => {
    return await User.findOne({ _id: id })
}

const addUser = async ({ email, password }) => {
    const user = new User({ email, password })
    return await user.save()
}

const uppdateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token })
}

const updateUserSub = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription });
};

const uppdateAvatar = async (id, avatarURL) => {
    return await User.updateOne({ _id: id }, { avatarURL })
}

module.exports = {
    findByEmail,
    findById,
    addUser,
    uppdateToken,
    updateUserSub,
    uppdateAvatar
}