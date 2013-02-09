var Homepg = require('../models/fb_model.js');

/*
 * GET all the facebook things
 */
exports.login = function(req, res){
	req.facebook.api('/me', function(err, data) {
		console.log('user',data);
		var id = data.id
			, img = "http://graph.facebook.com/" + data.username + "/picture/";
		console.log(img);
		console.log('Somehow got here');
		res.render('index', {title: 'Pain in the neck', image: img});
	});
};