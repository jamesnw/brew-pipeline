<?php
header("Access-Control-Allow-Origin: *");
include('globals.php');

$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['SCRIPT_URL'];
if(strpos($url, '/password.php') !== FALSE){
	if($method === 'POST'){
		$password = password_hash(KEG_API_PASSWORD, PASSWORD_DEFAULT);
		$sql = 'UPDATE kegs_meta SET password = "%s" WHERE row = %d';
		$sql = sprintf($sql, $password, META_ROW_ID);
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
		print json_encode($rows);
	}

	if($method === 'GET'){
		if(isset($_GET['password'])){
			$password_to_check = $_GET['password'];
		} else {
			die('No password given');
		}
		$valid = checkPassword($password_to_check);
		if($valid){
			http_response_code(200);
		} else {
			http_response_code(401);
		}
	
	}
}

function checkPassword($password_to_check){
	$sql = 'SELECT password from kegs_meta WHERE row = %d';
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
	$password = $rows[0]['password'];

	$valid = password_verify($password_to_check, $password);
	return $valid;
}