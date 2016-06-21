<?php
	$dbconn = pg_connect("host=localhost dbname=Rate user=RateAdmin password=RateAdmin");

	$rating = $_POST["rating"];

	$res = pg_insert($dbconn, "Rate", $rating);

	if ($res) {
		echo("Success!");
	} else {
		die("No success.");
	}
?>