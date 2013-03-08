twitter-feed-reader
===================

Jquery plugin to read a twitter feed (cached or non-callback) and display on page.

---

Usage:
===
$('#TwitterWidget').TwitterFeed({
	userName: 'AccountName',
	feedLocation: 'PathTo.json'
});
  
---

Defaults:
===
* __feedLocation__ : "user_timeline.json" _//Path to json file
* __limit__ : 5 _//Max number of items to display
* __userName__ : "twitter" _//Name of twitter account
* __classPrefix__ : "tfr" _//Class to add to elements for namespacing
* __feedError__ : "There was an error reading the Twitter Feed" _//Error message when no AJAX fails
* __linksInNewWindow__ : true _//Open Links in new window (target="_blank")

Overrides:
===
	_//customize the header_
	userHeader : function(o, data) {
		return '<div class="' + o.classPrefix + '-header">\n'
			 + '<img src="' + data.imagePath + '" alt="' + data.displayName + '" class="' + o.classPrefix + '-user-image" />'
		     + '<h3>' + data.displayName + '</h3>\n'
			 + '<a href="https://twitter.com/intent/user?screen_name=' + o.userName + '">' + o.userName + '</a>' 
			 + '</div>';
	}
	
	_//customize the list items_
	listItemTemplate: function(o, data) {
		return '<li class="' + o.prefix + '-item ' + o.prefix + '-item-' + data.index + '">\n'
			+  '<a href="https://twitter.com/intent/user?screen_name=' + o.userName + '" class="' + o.prefix + '-user-name">' + o.userName + '</a> '
			+  '<span class="' + o.userName + '-text">' + data.text + '</span> '
			+  '<span class="' + o.userName + '-date">' + data.date + '</span> '
			+  '</li>\n';
	}
	
	_//customize the footer_
	userFooter : function(o, data) {
		return '<div class="' + o.classPrefix + '-footer">\n'
			 + '<a href="https://twitter.com" target="_blank">'
			 + '<img alt="' + o.userName + '" src="http://widgets.twimg.com/i/widget-bird.png" class="' + o.classPrefix + '-icon" /></a>'
		     + '<a class="' + o.classPrefix + '-conversation" href="https://twitter.com/' + o.userName + '">'
			 + 'Join the conversation</a></div>';
	}