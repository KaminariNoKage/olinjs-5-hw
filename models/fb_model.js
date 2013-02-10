var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// Somehow worked
});

var homeSchema = mongoose.Schema({
	name: String,
	fb_id: String,
	image: String,
	background: String,
	textcolor: String,
	textfont: String,
	textsize: String,
	message: String
});

var Homepg = mongoose.model('Homepg', homeSchema);
module.exports = Homepg;