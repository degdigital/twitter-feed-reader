/*
* jQuery Twitter Feed Reader
* http://github.com/degdigital/twitter-feed-reader
* Version: 0.1 (3/8/13)
* Dual licensed under the MIT and GPL licenses.
* http://www.degdigital.com
* Requires: jQuery v1.7
*/

; (function ($, window, document, undefined) {

	var pluginName = "TwitterFeed",
        defaults = {
        	feedLocation: "user_timeline.json",
        	limit: 5,
        	userName: "twitter",
        	classPrefix: "tfr",
        	feedError: 'There was an error reading the Twitter Feed',
        	userImage: true,
        	userHeader : true,
        	userFooter : true,
        	twitterLink : true,
        	footerText : "Join the conversation",
        	LinksInNewWindow : true
        };

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {

		init: function() {
			$(this.element).append('<ul class="' + this.options.classPrefix + '-container"></ul>');
			this.readStream(this.element, this.options);
		},

		replaceURLWithHTMLLinks: function(text) {
		    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		    return text.replace(exp,"<a href='$1'>$1</a>"); 
		},

		replaceTwitterUserNameWithHTMLLinks: function(text) {
			var exp = /(^|[^@\w])@(\w{1,15})\b/g;
			return text.replace(exp, " <a href='http://twitter.com/$2'>@$2</a>");
		},

		replaceHashtagWithHTMLLinks: function(text) {
			var exp = /(^|\s)#(\w+)/g;
			return text.replace(exp, " <a href='http://twitter.com/search?q=%23$2'>#$2</a>");
		},

		readStream: function(el, options) {
			$.ajaxSetup ({
				cache: false
			});

			var $container = $(el).children('.' + options.classPrefix + '-container'),
				listItems = "",
				userImagePath = "",
				userLongName = "",
				self= this;

			$.ajax({
				url: options.feedLocation,
				success: function(data) {
					if (options.limit > 0) {
						data = data.slice(0, options.limit);
					}
					$(data).each(function(i, e){
						var date = new Date (e.created_at),
							formattedDate = "",
							tweetText = e.text,
							formattedText = "";

						formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
						formattedText = self.replaceURLWithHTMLLinks(tweetText);
						formattedText = self.replaceHashtagWithHTMLLinks(formattedText);
						formattedText = self.replaceTwitterUserNameWithHTMLLinks(formattedText);

						listItems += '<li class="' + options.classPrefix + '-item ' + options.classPrefix + '-item-' + i + '">\n'
							+ '<a href="https://twitter.com/intent/user?screen_name=' + options.userName + '" class="' + options.classPrefix + '-user-name">'
							+ options.userName + '</a> '
							+ '<span class="' + options.userName + '-text">' + formattedText  + '</span> '
							+ '<span class="' + options.userName + '-date">' + formattedDate + '</span> '
							+ '</li>\n';

						if (i === 0) {
							if (options.userHeader) {
								userLongName = e.user.name;
								var header = '<div class="' + options.classPrefix + '-header">\n';
								if (options.userImage) {
									userImagePath = e.user.profile_image_url;
									header += '<img src="' + userImagePath + '" alt="' + userLongName + '" class="' + options.classPrefix + '-user-image" />'
								}
								header += '<h3>' + userLongName + '</h3>\n'
									+ '<a href="https://twitter.com/intent/user?screen_name=' + options.userName + '">' + options.userName + '</a>' 
									+ '</div>'
								$container.before(header);
							}
							if (options.userFooter) {
								var footer = '<div class="' + options.classPrefix + '-footer">\n';
								if (options.twitterLink) {
									footer += '<a href="https://twitter.com" target="_blank">'
										+ '<img alt="" src="http://widgets.twimg.com/i/widget-bird.png" /></a>'
								}
								footer += '<a class="' + options.classPrefix + '-conversation" href="https://twitter.com/' + options.userName + '">' + 
									options.footerText + '</a></div>';
								$container.after(footer);
							}
						}
					});
					$container.append(listItems);

					if (options.LinksInNewWindow) {
						$(el).find('a').attr('target', '_blank');
					}

				},
				error: function() {
					$container.html(options.feedError);
				}
			});
		}

	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);