function copy(elemId) {
  var command = document.getElementById(elemId);
  command.select();
  document.execCommand("Copy");
  alert("Copied command: " + command.value);
}
