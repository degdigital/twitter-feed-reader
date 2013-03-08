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
* feedLocation: "user_timeline.json" //Path to json file
* limit: 5 //Max number of items to display
* userName: "twitter" //Name of twitter account
* classPrefix: "tfr" //Class to add to elements for namespacing
* feedError: "There was an error reading the Twitter Feed" //Error message when no AJAX fails
* userHeader : true //Display header with user name and description
* userImage: true //Display the user thumbnail image in header (required userHeader)
* userFooter : true //Display the user footer
* twitterLink : true //Display Twitter link and icon
* footerText : "Join the conversation" //Text to display in footer (links to profile, requires userFooter)
* LinksInNewWindow : true //Open Links in new window (target="_blank")
