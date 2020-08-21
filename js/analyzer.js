
var displayButton = document.getElementById('display');
displayButton.onclick = function() { 
  clearOutput();
  displayResults();
  return false;
}
var downloadButton = document.getElementById('download');
download.onclick = function() { 
  downloadResults();
  return false;
}
function displayResults() { 
    var form = document.getElementById("paperinfo");
    var url = form.elements[0].value;
    var document_type = form.elements[1].value;
    var reference_style = form.elements[2].value; 
    document.getElementById("results").innerHTML = "Loading! Please wait..."
    var scholarLinksEnabled = form.elements[3].value === "yes" ? true : false; 
    (async () => {
    try {
      var response = await fetch("https://ref.scholarcy.com/api/references/extract?url=" + url + "&document_type=" + document_type + "&resolve_references=true&reference_style=" + reference_style + "&engine=v1");
      var data = await response.json();
      document.getElementById("results").innerHTML = "";
      for (reference of data.reference_links) {
        document.getElementById("results").innerHTML += reference.entry
        if (scholarLinksEnabled && reference.scholar_url) { 
          document.getElementById("results").innerHTML += "<a href=" + reference.scholar_url + " target= _blank> <img border='0' alt='Google Scholar' src='images/scholar.png' width='20' height='20'></a>";
        }
        document.getElementById("results").innerHTML += "<br><br>";
      }
    } catch (e) {
      console.log('Error', e);
      if (url == "") {
        document.getElementById("results").innerHTML = "Enter a URL for me to analyze!";
      } else {
        document.getElementById("results").innerHTML = "An error was encountered with the file you submitted. Please try another file or email me at nicasnes@gmail.com."
      }
    }
  })();
}

function clearOutput() {
  document.getElementById("results").innerHTML = "";
}

function downloadResults() { 
  var form = document.getElementById("paperinfo");
  var url = form.elements[0].value;
  var document_type = form.elements[1].value;
  var reference_style = form.elements[2].value; 
  (async () => {
  try {
    var response = await fetch("https://ref.scholarcy.com/api/references/download?url=" + url + "&document_type=" + document_type + "&reference_style=" + reference_style + "&reference_format=ris&engine=v1");
    console.log(response);
    if (response.status === 200) {
      window.open(response.url);
    } else { 
      document.getElementById("results").innerHTML = "An error was encountered with the file you submitted. Please try again in a few moments or email me at nicasnes@gmail.com."
    }
  } catch (e) {
    console.log('Error', e);
    if (url == "") {
      document.getElementById("results").innerHTML = "Enter a URL for me to analyze!";
    } else {
      document.getElementById("results").innerHTML = "An error was encountered with the file you submitted. Please try another file or email me at nicasnes@gmail.com."
    }
  }
})();
}
