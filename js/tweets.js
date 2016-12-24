/** The lowest tweet ID which has been displayed **/

var lowestTweetId = 'default';

/** Count of total tweets displayed on the page **/
var count = 0;

/** Template of the tweet div that will be appended **/
var tweetTemplate = '\
<div class="col-md-6">\
    <div class="panel panel-default">\
        <div class="panel-heading">\
            <h3 class="tweet-owner"></h3>\
        </div>\
        <div class="panel-body">\
            <p class="tweet"></p>\
            <strong><p class="rt-count"></p></strong>\
        </div>\
    </div>\
</div>';


/**
 * Function to fetch tweets asynchronously from the API
 *
 * @callback requestCallback
 * @param none
 */
function getTweets(callback) {
   $.ajax({
       url: 'get_tweets.php',
       type: 'GET',
       data:{'max_id' : lowestTweetId},
       success: function(data) {

        /** Updated lowestTweetId to ID of the last tweet fetched **/
        lowestTweetId = data.statuses[data.statuses.length - 1].id_str;

        /** Fire the callback **/
        callback(data.statuses);
    },
    error: function(errors) {
        $('.tweets-container p:first').text('Request error');
    }
});
}

/**
 * Function to display the fetched tweets
 *
 * @param {array} statuses contains array of tweet objects
 */
function displayTweets(statuses) {
    /** Iterate through all the tweets **/
    $.each(statuses, function(index, tweet) {
        /** Create a new bootstrap row div after every 2 tweets displayed **/
        if (tweet.retweet_count >= 1) {
            if (count % 2 == 0) {
                var div = $("<div/>", {'class': 'row'});
                $(".container").append(div);    /** Add row div at the end **/
            }
            var tweetDiv = $(tweetTemplate);
            tweetDiv.find('.tweet').html(tweet.text);
            tweetDiv.find('.rt-count').html('RT: ' + tweet.retweet_count);
            tweetDiv.find('.tweet-owner').html('@' + tweet.user.screen_name);
            $(".row").last().append(tweetDiv);
            count++;
        }
    });
}

/**
 * Fired when the page is loaded
 */
$(document).ready(function() {
    /** Fetch and display the tweets **/
    getTweets(displayTweets);
});

/**
 * Fetch more tweets if the page is scrolled to bottom
 */
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        /** Fetch and display the tweets **/
        getTweets(displayTweets);
    }
});