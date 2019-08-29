const { Schema, model } = require('mongoose');

const tagSchema = new Schema ({

  name: {
    type: String,
    unique: [true, 'tag already exist']
  },
  count: {
    type: Number
  }

})

const Tag = model('Tag', tagSchema)

module.exports = Tag