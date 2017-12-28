<?php
$filepath = "";
if (isset($_GET["source"])) {
  $filepath = "source/{$_GET["source"]}";
} else if (isset($_GET["result"])) {
  $filepath = "cache/{$_GET["result"]}.json";
} else {
  die("400 Bad Request");
}

$fc = "";
if (file_exists($filepath)) {
  $fc = file_get_contents($filepath);
} else {
  die("404 Not Found");
}

$json = json_encode(json_decode($fc), JSON_PRETTY_PRINT);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Displaying testfile</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/ocean.min.css">
    <style>
      body {
        background-color: #2b303b;
        margin: 0;
      }
      pre {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <pre><code class="json"><?= $json ?></code></pre>
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad()</script>
  </body>
</html>
