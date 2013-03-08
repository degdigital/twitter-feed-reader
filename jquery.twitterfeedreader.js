/*
* jQuery Twitter Feed Reader
* http://github.com/degdigital/twitter-feed-reader
* Version: 0.1.1 (3/8/13)
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
        	linksInNewWindow : true,

        	// Templates
        	userHeader : function(o, data) {
				return '<div class="' + o.classPrefix + '-header">\n'
					 + '<img src="' + data.imagePath + '" alt="' + data.displayName + '" class="' + o.classPrefix + '-user-image" />'
				     + '<h3>' + data.displayName + '</h3>\n'
					 + '<a href="https://twitter.com/intent/user?screen_name=' + o.userName + '">' + o.userName + '</a>' 
					 + '</div>';
        	},
        	userFooter : function(o) {
        		return '<div class="' + o.classPrefix + '-footer">\n'
					 + '<a href="https://twitter.com" target="_blank">'
					 + '<img alt="' + o.userName + '" src="http://widgets.twimg.com/i/widget-bird.png" class="' + o.classPrefix + '-icon" /></a>'
				     + '<a class="' + o.classPrefix + '-conversation" href="https://twitter.com/' + o.userName + '">'
					 + 'Join the conversation</a></div>';
        	},
        	listItemTemplate: function(o, data) {
        		return '<li class="' + o.prefix + '-item ' + o.prefix + '-item-' + data.index + '">\n'
					+  '<a href="https://twitter.com/intent/user?screen_name=' + o.userName + '" class="' + o.prefix + '-user-name">' + o.userName + '</a> '
					+  '<span class="' + o.userName + '-text">' + data.text + '</span> '
					+  '<span class="' + o.userName + '-date">' + data.date + '</span> '
					+  '</li>\n';
			}
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
		    // $1 = url
		    return text.replace(exp,"<a href='$1'>$1</a>"); 
		},

		replaceTwitterUserNameWithHTMLLinks: function(text) {
			var exp = /(^|[^@\w])@(\w{1,15})\b/g;
			// $1 = string before @
			// $2 = string after @
			return text.replace(exp, " $1<a href='http://twitter.com/$2'>@$2</a>");
		},

		replaceHashtagWithHTMLLinks: function(text) {
			var exp = /(^|\s)#(\w+)/g;
			// $1 = string before #
			// $2 = string after #
			return text.replace(exp, " $1<a href='http://twitter.com/search?q=%23$2'>#$2</a>");
		},

		formatText: function(text) {
			text = this.replaceURLWithHTMLLinks(text);
			text = this.replaceHashtagWithHTMLLinks(text);
			text = this.replaceTwitterUserNameWithHTMLLinks(text);
		    return text;
		},

		formatDate: function(date) {
			return formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
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
				success: ajaxSuccess,
				error: function() {
					$container.html(options.feedError);
				}
			});

			function ajaxSuccess(data) {
				if (options.limit > 0)
					data = data.slice(0, options.limit);

				$(data).each(parseData);

				$container.append(listItems);

				if (options.linksInNewWindow)
					$(el).find('a').attr('target', '_blank');
			}

			function parseData(i, e) {
				var date = new Date (e.created_at);

				listItems += options.listItemTemplate(options, {
					'index': i,
					'text' : self.formatText(e.text),
					'date' : self.formatDate(date)
				});

				if (i === 0) {
					if (options.userHeader)
						$container.before(options.userHeader(options, {
							'imagePath': e.user.profile_image_url,
							'displayName': e.user.name
						}));

					if (options.userFooter)
						$container.after(options.userFooter(options));
				}
			}
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