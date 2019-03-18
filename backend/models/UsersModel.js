module.exports = db => db.model('users', new db.Schema({

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }

}));
