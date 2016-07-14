<?php
	echo "PHP running";

	$dbconn = pg_connect("host=localhost dbname=rate user=rateadmin password=rateadmin");

	$rating = $_POST["rating"];

	$res = pg_insert($dbconn, "rate", $rating);

	if ($res) {
		echo "Success!";
	} else {
		die("No success.");
	}
	/*Need a bit of fine tuning :(*/
?>
