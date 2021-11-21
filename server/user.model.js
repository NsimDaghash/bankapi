const mongoose = require('mongoose');

const { model, Schema } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must not be empty'],
    },
    passportID: {
      type: Number,
      required: [true, 'Id must not be empty'],
    },
    cash: {
      type: Number,
      required: [true, 'Cash must not be empty'],
    },
    credit: {
      type: Number,
      required: [true, 'Credit must not be empty'],
    },
    isActive: {
      type: Boolean,
      required: [true, 'This field must not be empty'],
    },
  },
  { timestamps: true }
)

const User = model('User', userSchema)

module.exports = User