<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header('Access-Control-Allow-Headers: Content-Type, Authorization, Kegauthorization');

// include('globals.php');
include('password.php');
$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['SCRIPT_URL'];

if(strpos($url, '/keg.php') !== FALSE){
	if($method === 'OPTIONS'){
		return;
	}
	$headers = apache_request_headers();
	$password_to_check = $headers['Kegauthorization'];
	$valid = checkPassword($password_to_check);
	if($valid){
		http_response_code(200);
	} else {
		http_response_code(401);
		print json_encode(['UnauthorizedError' => 'Unauthorized']);
		return;
	}

	if($method === 'GET'){
		$id = NULL;
		if(isset($_GET['id'])){
			$id = $_GET['id'];
		}
		print(getKeg($id));
	}
	if($method === 'POST'){
		$keg = json_decode(file_get_contents("php://input"),true);
		if(!$keg){
			die('Invalid keg');
		}

		$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		$keg_safe =  $conn->real_escape_string(json_encode($keg));
	
		$sql = 'INSERT INTO kegs (`keg_data`) VALUES ("%s")';
		$sql = sprintf($sql, $keg_safe);
	
		// Check connection
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}

		$result = $conn->query($sql) or die(mysqli_error($conn));

		$return = [
			'id' => $conn->insert_id,
			];
		print json_encode($return);
	}

	if($method === 'PUT'){
		$keg = json_decode(file_get_contents("php://input"),true);
		if(!$keg){
			die('Invalid keg');
		}
		if(!$keg['id']){
			die('No id set');
		}
		print_r($keg);
		$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		$keg_safe =  $conn->real_escape_string(json_encode($keg));
		print_r($keg_safe);
	
		$sql = 'UPDATE kegs SET `keg_data`="%s" WHERE id = %d';
		$sql = sprintf($sql, $conn->real_escape_string(json_encode($keg['keg_data'])), $keg['id']);
	
		// Check connection
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		print(PHP_EOL);
		print($sql);
		$result = $conn->query($sql) or die(mysqli_error($conn));
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
				$rows[] = $r;
		}
		print_r($result);
		return json_encode($rows[0]);
	}

	if($method === 'DELETE'){
		$id = $_GET['id'];
		if(!$id){
			die('No id set');
		}
		$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	
		$sql = 'DELETE FROM kegs where id = %d';
		$sql = sprintf($sql, $id);
		// Check connection
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		$result = $conn->query($sql) or die(mysqli_error($conn));
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
				$rows[] = $r;
		}
		print_r($result);
// 		return json_encode($rows[0]);
	}
}
function getKeg($id = NULL){
	$sql = '';
	if($id){
		$sql = 'SELECT * from kegs WHERE id = %d';
		$sql = sprintf($sql, $id);
	} else {
		$sql = 'SELECT * from kegs';
	}
	
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	$result = $conn->query($sql);
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		$r['keg_data'] = json_decode($r['keg_data']);
		$rows[] = $r;
	}
	if(count($rows) == 1){
		$rows = $rows[0];
	}
	return json_encode($rows);
}