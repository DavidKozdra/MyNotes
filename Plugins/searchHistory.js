

function searchPlugin(coreApp) {

    coreApp.registerEventHandler("search", addSearchHistory)
    coreApp.searchHistory = []
    function addSearchHistory(searchQuery){
        coreApp.searchHistory.push(searchQuery)
    }

    // Function to add a search input to the user interface
    addHistoryDisplay = () => {
        // Create the search input element
        const historyDisplay = document.createElement("div");
        historyDisplay.setAttribute("id", "searchHistoryDisplay"); // Set an ID for the input

        // Add the search input to the UI (e.g., a toolbar or header)
        const uiContainer = document.getElementById("todo"); // Replace with the actual container ID
        uiContainer.appendChild(historyDisplay);
    }

    addHistoryDisplay();
}

module.exports = { searchPlugin };