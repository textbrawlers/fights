<?php
include("util/Parsedown.php");

$filepath = "content/index.md";
if (isset($_GET["page"]) && !empty($_GET["page"])) {
  $filepath = "content/{$_GET["page"]}.md";
}

$content = "";
if (file_exists($filepath)) {
  $content = file_get_contents($filepath);
} else {
  die("404 Not Found");
}
?>
<!DOCTYPE html>
<html lang="en" style="font-family: Verdana;">
    <head>
        <meta charset="UTF-8">
        <title>TextbrawlersAPI</title>
    </head>
    <body>
      <?php echo Parsedown::instance()->text($content);?>
    </body>
</html>
