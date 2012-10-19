$('.demos li > a').on('click', function() {
	var container = $(this).next('pre'),
		source = container.find('code').html().replace('&lt;', '<').replace('&gt;', '>');
	container.show();
	eval(source);
});