// Access the Element objects for the display and download buttons.
let displayButton = document.getElementById('display');
let downloadButton = document.getElementById('download');

displayButton.onclick = function() { 
  clearOutput();
  produceResults(false);
  return false;
}


download.onclick = function() { 
  produceResults(true);
  return false;
}

/**
 * Utilizes the elements of the form to produce output, either modifying
 * the inner HTML of results or downloading the .RIS from Scholarcy.
 * @param {boolean} isDownload - denotes whether or not the file is being downloaded
 */
function produceResults(isDownload) { 
  // Access the elements of the form through these variables.
  let form = document.getElementById("paperinfo");
  let url = form.elements[0].value;
  let document_type = form.elements[1].value;
  let reference_style = form.elements[2].value; 
  let results = document.getElementById("results");

  results.innerHTML = "Loading! Please wait...";
  let scholarLinksEnabled = form.elements[3].value === "yes" ? true : false; 

  (async () => {
    try {
      if (isDownload) { 
        // Make a GET request to the Scholarcy API using the provided URL to download the results as an RIS file
        let response = await fetch("https://ref.scholarcy.com/api/references/download?url=" + url + "&document_type=" + document_type + "&reference_style=" + reference_style + "&reference_format=ris&engine=v1");
        window.open(response.url);
        clearOutput();
    
      } else { 
        // Make a GET request to the Scholarcy API using the provided URL to extract the results
        let response = await fetch("https://ref.scholarcy.com/api/references/extract?url=" + url + "&document_type=" + document_type + "&resolve_references=true&reference_style=" + reference_style + "&engine=v1");
        let data = await response.json();
        results.innerHTML = "";

        // Loop through the references in the JSON produced by the Fetch API
        // and modify the inner HTML of results to list the references with scholar links
        for (reference of data.reference_links) {
          results.innerHTML += reference.entry
          if (scholarLinksEnabled && reference.scholar_url) { 
            results.innerHTML += "<a href=" + reference.scholar_url + " target= _blank><img border='0' alt='Google Scholar' src='images/scholar.png' width='20' height='20'></a>";
          }
          results.innerHTML += "<br><br>";
        }
      }
    } catch (e) {
      console.log('Error', e);
      if (url == "") {
        results.innerHTML = "Enter a URL for me to analyze!";
      } else {
        results.innerHTML = "An error was encountered with the file you submitted. Please try another file or email me at nicasnes@gmail.com."
      }
    }
})();
}

/**
 * Clears the inner HTML of the results box.
 */
function clearOutput() {
  document.getElementById("results").innerHTML = "";
}