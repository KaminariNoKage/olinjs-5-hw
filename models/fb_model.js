var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// Somehow worked
});

var homeSchema = mongoose.Schema({
	name: String,
	background: String,
	textfont: String,
	textsize: Number
});

var Homepg = mongoose.model('Homepg', homeSchema);
module.exports = Homepg;