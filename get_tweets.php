<?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '2502124110-ocfvBWxZXVFrAyKCDualnrbK864X1uPvy3WwwWh';
$oauth_access_token_secret = 'LDFKtA3Vqrt5y3PlhCwOOiVJc2nK3EwAYEee0qPWnIDsv';
$consumer_key = '1OlBvpZc55tzhb5YbM7rIhhT5';
$consumer_secret = 'TTwu4qqxWpbkUn9smuo2g5XvAS16u7ETtYZxy0vDspH4GjE4VI';
// $user_id = '78884300';
// $screen_name = 'nain977';
$query = '%23custserv';
$maxId = $_GET['max_id'];

if ($maxId != 'default') {

	$max_id = bcsub($maxId, 1);
	$twitter_url = 'search/tweets.json';
	$twitter_url .= '?q=' . $query;
	$twitter_url .= '&max_id=' . $max_id;

	// Create a Twitter Proxy object from our twitter_proxy.php class
	$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$query,							// User id (http://gettwitterid.com/)
	$max_id
	);

} else {
	$twitter_url = 'search/tweets.json';
	$twitter_url .= '?q=' . $query;

	// Create a Twitter Proxy object from our twitter_proxy.php class
	$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$query							// User id (http://gettwitterid.com/)
	);
}

// echo $twitter_url;
// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>