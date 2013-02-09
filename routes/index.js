
/*
 * GET home page.
 */

var Homepg = require('../models/fb_model.js');

exports.index = function(req, res){
	req.facebook.api('/me', function(err, data) {
		var id = data.id
			, img = "https://graph.facebook.com/" + data.username + "/picture/";
		Homepg.find({name: id}).exec(function (err, docs) {
			if (docs[0] == null){
				var newuser = new Homepg({name: id, background: 'black', textfont: 'arial', textsize: 20});
				newuser.save(function (err) {
				if (err)
					return console.log("Error: We couldn't save the new User");
				res.render('index', {title: id, image: img});
				});
			}
			else {
				console.log('user',data);
				res.render('index', {title: id, image: img});
			};
		});
	});
};