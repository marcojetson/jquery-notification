/*!
 * @license
 * @licstart The following is the entire license notice for the
 * below JavaScript code.
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend The above is the entire license notice for the below
 * JavaScript code.
 */
;(function($) {

	$.notificationOptions = {
		click: function() {},
		content: '',
		duration: 5000,
		fadeIn: 400,
		fadeOut: 600,
		limit: false,
		queue: false,
		slideUp: 200,
		horizontal: 'right',
		vertical: 'top'
	};

	var Notification = function(board, options) {
		var that = this;
		// build notification template
		var htmlElement = $([
			'<div class="notification" style="display:none">',
				'<div class="close"></div>',
				options.content,
			'</div>'
		].join(''));
		// getter for template
		this.getHtmlElement = function() {
			return htmlElement;
		};
		// custom hide
		this.hide = function() {
			htmlElement.addClass('hiding');
			htmlElement.animate({ opacity: .01 }, options.fadeOut, function() {
				var queued = queue.shift();
				if (queued) {
					$.createNotification(queued);
				}
			});
			htmlElement.slideUp(options.slideUp, function() {
				$(this).remove();
			});
		};
		// show in board
		this.show = function() {
			// append to board and show
			htmlElement[options.vertical == 'top' ? 'appendTo' : 'prependTo'](board);
			htmlElement.fadeIn(options.fadeIn);
		};
		// set custom click callback
		htmlElement.on('click', function() {
			options.click.apply(that);
		});
		// helper classes to avoid hide when hover
		htmlElement.on('mouseenter', function() {
			htmlElement.addClass('hover');
			if (htmlElement.hasClass('hiding')) {
				// recover
				htmlElement.stop(true);
				// reset slideUp, could not find a better way to achieve this
				htmlElement.attr('style', 'opacity: ' + htmlElement.css('opacity'));
				htmlElement.animate({ opacity: 1 }, options.fadeIn);
				htmlElement.removeClass('hiding');
				htmlElement.addClass('pending');
			}
		});
		htmlElement.on('mouseleave', function() {
			if (htmlElement.hasClass('pending')) {
				// hide was pending
				that.hide();
			}
			htmlElement.removeClass('hover');
		});
		// close button bind
		htmlElement.children('.close').on('click', function() {
			that.hide();
		});
		if (options.duration) {
			// hide timer
			setTimeout(function() {
				if (htmlElement.hasClass('hover')) {
					// hovering, do not hide now
					htmlElement.addClass('pending');
				} else {
					that.hide();
				}
			}, options.duration);
		}
		return this;
	};

	var queue = [];

	$.createNotification = function(options) {
		options = $.extend({}, $.notificationOptions, options || {});
		// get notification container (aka board)
		var board = $('.notification-board.' + options.horizontal + '.' + options.vertical);
		if (!board.length) {
			board = $('<div class="notification-board ' + options.horizontal + ' ' + options.vertical + '" />');
			board.appendTo('body');
		}
		if (options.limit && board.children('.notification:not(.hiding)').length >= options.limit) {
			// limit reached
			if (options.queue) {
				queue.push(options);
			}
			return;
		}
		// create new notification and show
		var notification = new Notification(board, options)
		notification.show(board);
		return notification;
	};

})(jQuery);