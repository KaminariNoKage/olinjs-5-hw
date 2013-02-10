var Homepg = require('../models/fb_model.js');

/*
 * GET all the facebook things
 */
exports.list = function(req, res){
	var homelist = Homepg.find({}).sort('fb_id').exec(function (err, docs) {
		if (err)
			return console.log("Error in User list");
		
		res.render('list', {title: 'Home IDs', idlist: homelist});
	});
};

exports.myhome = function(req, res){
	var user = req.session.user;
	if (user == null){
		res.redirect('/');
	}
	else {
		var un = user.name
			, img = user.image
			, bg = user.background
			, txc = user.textcolor
			, txf = user.textfont
			, txs = user.textsize
			, msg = user.message;
		res.render('index', {title: un, image: img, background: bg, textcolor: txc, textfont: txf, textsize: txs, message: msg});
	};
};

exports.update = function(req, res){
	var user = req.session.user
		, name = user.name
		, id = user.fb_id
		, img = user.image
		, bg = req.body.background
		, txc = req.body.textcolor
		, txf = req.body.textfont
		, txs = req.body.textsize
		, msg = user.message;

	//Just in case the message is lost in transit
	if (req.body.message != ""){
		msg = req.body.message;
	};

	Homepg.find({fb_id: id}).exec(function (err, docs) {
		//Checking to see if the user id already exists (once logged in)
		docs[0].remove();
		//Deleting old, adding/replacing with new
		var newuser = new Homepg({name: name, fb_id: id, image: img, background: bg, textcolor: txc, textfont: txf, textsize: txs, message: msg});
		console.log('Page updated');
		newuser.save(function (err) {
		if (err)
			return console.log("Error: We couldn't save the new User");
		//Redirecting to home for more fun stuff
		res.redirect('/myhome');
		});
	});
};

exports.logout = function(req, res){
	if (req.session.user == null){
		res.redirect('/');
	}
	else{
		//FB.logout(function(response) {
			req.session.user = null;
			res.redirect('/');
		//};
	};
};