<?php
$filepath = "";
if (isset($_GET["file"])) {
  $filepath = "source/{$_GET["file"]}";
} else {
  die("Empty query param \"file\".");
}

$fc = "";
if (file_exists($filepath)) {
  $fc = file_get_contents($filepath);
} else {
  die("The file \"{$_GET["file"]}\" does not exist on server.");
}

// Build request
$ch = curl_init("https://textbrawlers.gigavoid.com/api/fight");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $fc);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($fc))
);

// Make and close request
$res = curl_exec($ch);
curl_close($ch);

$json = json_encode(json_decode($res), JSON_PRETTY_PRINT);

$output = "<pre><code class=\"json\">$json</code></pre>
  <link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/ocean.min.css\">
  <script src=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js\"></script>
  <script>hljs.initHighlightingOnLoad()</script>";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Fight result</title>
    <style>body{margin:0;}pre{margin:0;}</style>
  </head>
  <body>
    <?= $output ?>
  </body>
</html>
