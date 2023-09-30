
const path = window.electron.require('path');
const __dirname = path.resolve();
const fs = window.electron.require('fs');

// Define a function to initiate the file download
function downloadFile(url, options = {}) {
    electronDl.download(window, url, options)
      .then(dl => {
        // The file has been downloaded successfully.
        console.log('Download complete:', dl.getSavePath());
        shell.showItemInFolder(dl.getSavePath()); // Open the folder containing the downloaded file.
      })
      .catch(err => {
        // Handle download errors.
        console.error('Download error:', err);
      });
  }
  
// Wrap your JavaScript code in a window.onload event handler
window.onload = function () {
    async function fetchDataAndDisplay() {
  try {
    const response = await fetch('http://localhost:3000/plugins/all');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const plugins = await response.json();
    
    console.log(plugins);
    const pluginList = document.getElementById('pluginList');

    plugins.forEach(plugin => {
      const listItem = document.createElement('li');
      // Create a container for the plugin information
      const pluginInfoContainer = document.createElement('div');
      pluginInfoContainer.classList.add('plugin-info');
    
      // Display the plugin name and description
      const nameDescription = document.createElement('p');
      nameDescription.textContent = `Name: ${plugin.Name}, Description: ${plugin.Description}`;
      pluginInfoContainer.appendChild(nameDescription);
    
      // Create a download button
      const downloadButton = document.createElement('button');
      downloadButton.addEventListener('click', async () => {
        const downloadUrl = `http://localhost:3000/plugins/download/${plugin.PluginID}`;

        fetch(downloadUrl)
          .then((response) => {
            if (!response.ok) {
              console.error(`Failed to download: ${response.status} ${response.statusText}`);
              throw new Error('Download failed');
            }
            console.log(response)
            return response.blob(); // Convert the response to a Blob
          })



          .then((blob) => {
                // Use the writeFile method to write the content to the file
                console.log(blob)

                // Create a new FileReader
                const reader = new FileReader();
                // Set up an event handler for when the FileReader has finished reading the Blob
                reader.onload = function(event) {
                    const blobText = event.target.result; // This is the text content of the Blob as a string
                    fs.writeFile("./Plugins/"+plugin.Name+".js", blobText, (err) => {
                        if (err) {
                        console.error('Error writing to file:', err);
                        return;
                        }
                        console.log('Data written to file successfully.');
                    });
                    window.alert("downloaded " + plugin.Name)
                };
  
                // Read the Blob as text
                let x = reader.readAsText(blob);

                console.log(x)
        
          })
          .catch((error) => {
            console.error(error);
          });
        
      });
      downloadButton.innerHTML = "Download"
      pluginInfoContainer.appendChild(downloadButton);
    
      // Add the plugin information container to the list item
      listItem.appendChild(pluginInfoContainer);
    
      // Append the list item to the plugin list
      pluginList.appendChild(listItem);
    });
    
  } catch (error) {
    console.error(error);
    // Handle error if the request fails
  }
}

fetchDataAndDisplay();

};