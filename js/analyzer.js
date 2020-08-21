
var displayButton = document.getElementById('display');
displayButton.onclick = function() { 
  clearOutput();
  displayResults();
  return false;
}
function displayResults() { 
    var form = document.getElementById("paperinfo");
    var url = form.elements[0].value;
    var document_type = form.elements[1].value;
    var reference_style = form.elements[2].value; 
    (async () => {
    try {
      var response = await fetch("https://ref.scholarcy.com/api/references/extract?url=" + url + "&document_type=" + document_type + "&resolve_references=true&reference_style=" + reference_style + "&engine=v1");
      var data = await response.json();
      for (reference of data.references) {
        document.getElementById("results").innerHTML += reference + "<br><br>";
      }
    } catch (e) {
      console.log('Error', e);
      document.getElementById("results").innerHTML = "An error was encountered with the file you submitted. Please try another file or email me at nicasnes@gmail.com."
    }
  })();
}

function clearOutput() {
  document.getElementById("results").innerHTML = "";

}