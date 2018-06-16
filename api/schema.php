<?php
header("Access-Control-Allow-Origin: *");
include('globals.php');

$method = $_SERVER['REQUEST_METHOD'];

if($method === 'GET'){
	print(getSchema());
}
if($method === 'PUT'){
	$schema = json_decode(file_get_contents("php://input"),true);
	if(!$schema){
		die('Invalid schema');
	}
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	$sql = 'UPDATE kegs_meta SET `keg_schema`="%s" WHERE row = %d';
	$sql = sprintf($sql, $conn->real_escape_string(json_encode($schema)), META_ROW_ID);
	
	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	print($sql);
	$result = $conn->query($sql) or die(mysqli_error($conn));
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
			$rows[] = $r;
	}
	print_r($result);
	return json_encode($rows[0]);
}

function getSchema(){
	$sql = 'SELECT keg_schema from kegs_meta WHERE row = %d';
	$sql = sprintf($sql, META_ROW_ID);
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	$result = $conn->query($sql);
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
	}
	$schema = $rows[0]["keg_schema"];
	return $schema;
}