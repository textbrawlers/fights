<?php
function display_testfiles() {
  $filedir = "source";
  $result = "";
  $directory = scandir($filedir);
  foreach ($directory as $filename) {
    if ($filename != ".." && $filename != ".") {
      $filepath = "$filedir/$filename";
      if (file_exists($filepath)) {
        $result .= "<tr><td>";
        $result .= "<a href=\"display.php?file=$filename\"><i class=\"fa fa-file-text\" aria-hidden=\"true\"></i>&nbsp;$filename</a>";
        $result .= "</td><td>";
        $result .= date("d-M-Y H:i:s", filemtime($filepath));
        $result .= "</td><td>";
        $result .= "<a href=\"run.php?file=$filename\"><i class=\"fa fa-play\" aria-hidden=\"true\"></i>&nbsp;Run test</a>";
        $result .= "</td><td>";
        $result .= "<a href=\"$filepath\" download><i class=\"fa fa-download\" aria-hidden=\"true\"></i>&nbsp;Download</a>";
        $result .= "</td><td>";
        $result .= "<input type=\"text\" id=\"$filename\" value=\"curl https://textbrawlers.gigavoid.com/test/source/$filename | http post https://textbrawlers.gigavoid.com/api/fight\" readonly><a href=\"#\" onclick=\"copy('$filename')\">&nbsp;<i class=\"fa fa-clipboard\" aria-hidden=\"true\"></i>&nbsp;Copy</a>";
        $result .= "</td></tr>";
      }
    }
  }
  return $result;
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="script.js"></script>
    <title>TextbrawlersAPI</title>
  </head>
  <body>
    <h1>TextbrawlersAPI</h1>
    <?php
      if (preg_match('/MSIE\s(?P<v>\d+)/i', @$_SERVER['HTTP_USER_AGENT'], $B) && $B['v'] <= 11) {
        echo "<p><b>WARNING:</b> This site does not support Internet Explorer.</p>";
      }
    ?>
    <!--<nav>
      <a href="create.php"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Create</a>
    </nav>-->
    <table>
      <thead>
        <tr>
          <th>
            File
          </th>
          <th>
            Modified
          </th>
          <th>
            Run Test
          </th>
          <th>
            Download
          </th>
          <th>
            Run in Terminal
          </th>
        </tr>
      </thead>
      <tbody>
        <?= display_testfiles() ?>
      </tbody>
    </table>
  </body>
