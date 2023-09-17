

function searchPlugin(coreApp) {

    coreApp.search = (query) => {
        // get the list from the coreapp.getlist 
        let notes = coreApp.getListOfNotes();
        if(!notes){
            return;
        }
            // Filter the notes based on the search query
        const filteredNotes = notes.filter((note) => {
            // Implement your search logic here
            // For example, check if the note's content contains the query
            // You can make the search case-insensitive for better results
            const noteContent = note.content.toLowerCase();
            const searchQuery = query.toLowerCase();
            return noteContent.includes(searchQuery);
        });
        

        const listItems = document.querySelectorAll('li'); 
        if(!listItems){
            return;
        }          
        for(var i =0 ; i < listItems.length; i++){
            const listItemText = listItems[i].innerText; // Convert text to lowercase for case-insensitive comparison
            (listItemText)
            
            const pattern = new RegExp(listItemText, 'i'); // Use the 'i' flag for case-insensitive matching

            // Check if the listItemText includes the search query
            if (pattern.test(query)) {
                listItems[i].style.backgroundColor = "yellow"; // Set background color to yellow
            } else {
                listItems[i].style.backgroundColor = ""; // Reset background color if not a match
            }
        }
        

    }
    // Function to add a search input to the user interface
    addSearchInput = () => {
        // Create the search input element
        const searchInput = document.createElement("input");
        searchInput.setAttribute("type", "text");
        searchInput.setAttribute("placeholder", "Search...");
        searchInput.setAttribute("id", "searchInput"); // Set an ID for the input


        // Add an event listener to capture user input and trigger the search
        searchInput.addEventListener("input", (event) => {
            const query = event.target.value;
            coreApp.search(query); // Trigger the search with the user's input
        });

        // Add the search input to the UI (e.g., a toolbar or header)
        const uiContainer = document.getElementById("todo"); // Replace with the actual container ID
        uiContainer.appendChild(searchInput);
        coreApp.triggerEvent("search",searchInput.value);
    }

    addSearchInput();
}

module.exports = { searchPlugin };