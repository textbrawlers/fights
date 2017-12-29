<?php
$filepath = "";
if (isset($_GET["file"])) {
  $filepath = "source/{$_GET["file"]}";
} else {
  die("400 Bad Request");
}

$fc = "";
if (file_exists($filepath)) {
  $fc = file_get_contents($filepath);
} else {
  die("404 Not Found");
}

// Build request
$ch = curl_init("https://textbrawlers.gigavoid.com/api/fight");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $fc);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "Content-Length: " . strlen($fc))
);

// Make and close request
$res = curl_exec($ch);
curl_close($ch);

$id = json_decode($res, true)["id"];

$file = fopen("cache/$id.json", "w") or die("Unable to open file!");
fwrite($file, $res);
fclose($file);

header("Location: https://textbrawlers.gigavoid.com/test/display.php?result=$id");
