module.exports = db => db.model('meetings', new db.Schema({

  title: String,
  content: String,

}));
