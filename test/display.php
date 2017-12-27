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

$json = json_encode(json_decode($fc), JSON_PRETTY_PRINT);

$output = "<pre><code class=\"json\">$fc</code></pre>
  <link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/ocean.min.css\">
  <script src=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js\"></script>
  <script>hljs.initHighlightingOnLoad()</script>";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Displaying testfile</title>
    <style>body{margin:0;}pre{margin:0;}</style>
  </head>
  <body>
    <?= $output ?>
  </body>
</html>
