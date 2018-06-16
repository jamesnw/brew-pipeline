<?php
header("Access-Control-Allow-Origin: *");
include('keg.php');

$kegs = json_decode(getKeg());



$clean = []; $last_updated = '0000-00-00 00:00:00';
foreach ($kegs as $keg){
	$clean[] = $keg->keg_data;
	if(strtotime($keg->updated) > strtotime($last_updated)){
		$last_updated = $keg->updated;
	}
}
$return = [];
$return['beers'] = $clean;
$return['updated'] = $last_updated;
print(json_encode($return));
