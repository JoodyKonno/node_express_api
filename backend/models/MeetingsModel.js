module.exports = db => db.model('meetings', new db.Schema({

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

}));
