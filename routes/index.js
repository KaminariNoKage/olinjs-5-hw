
/*
 * GET home page.
 */

exports.index = function(req, res){
	req.facebook.api('/me', function(err, data) {
		console.log('user',data, data.id);
		var id = data.id
			, img = "https://graph.facebook.com/" + data.username + "/picture/";
		console.log(img);
		console.log('Somehow got here');
		res.render('index', {title: 'Pain in the neck', image: img});
	});
};