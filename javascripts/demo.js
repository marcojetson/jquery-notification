var Demo = {
run: function(options) {
	return $.createNotification(options)
},
defaults: function() {
	return this.run({
		content: 'Hola mundo!'
	});
},
lowerLeftFast: function() {
	return this.run({
		horizontal: 'left',
		vertical: 'bottom',
		content: 'Hey hey Mar',
		duration: 1000
	});
},
image: function() {
	return this.run({
		content: '<img src="https://twimg0-a.akamaihd.net/profile_images/770845756/45_normal.jpg"> Hi, I\'m GG Allin'
	});
},
globalSlowFadeIn: function() {
	$.extend($.notificationOptions, {
		fadeIn: 2000
	});
	this.run({
		content: 'fadeIn is now set to 2000ms'
	});
},
globalResetFadeIn: function() {
	$.extend($.notificationOptions, {
		fadeIn: 400
	});
	this.run({
		content: 'fadeIn is now set to 400ms'
	});
},
limit: function() {
	this.run({
		content: 'Ho ho!',
		limit: 2,
		vertical: 'bottom'
	})
},
limitWithQueue: function() {
	this.run({
		content: 'ba dum ts!',
		limit: 2,
		queue: true,
		horizontal: 'left'
	})
},
sticky: function() {
	this.run({
		content: 'I\'m not leaving punk',
		duration: null
	});
},
stickyClose: function() {
	this.run({
		content: 'I may leave, if you click on me',
		duration: null,
		click: function() {
			this.hide();
		}
	});
}
};