const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { Subscription } = require('../../helpers/constants')
const SALT_WORK_FACTOR = 8

const userSchema = new Schema({
   email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
      validate(value) {
            const re = /\S+@\S+\.\S+/
            return re.test(String(value).toLowerCase())
      }
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
  },
  subscription: {
    type: String,
      enum: {
          values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
          massage: 'You can only choose from the above',
    },
    default: Subscription.FREE,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, {s: "250"}, true)
    } 
  },
    token: {
        type: String,
        default: null,
  },
    verificationToken: {
      type: String,
      required: [true, 'Verification token is required'],
    },
}, { versionKey: false, timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt, null)
    next()
})

userSchema.methods.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}
 
const User = model('user', userSchema) 
 
module.exports = User