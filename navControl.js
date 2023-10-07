function clickDropdown(){
    let container = document.getElementsByClassName("drop-menu-container");
    if (container[0].style.display === "block") {
        container[0].style.display = "none"; // If it's visible, hide it
    } else {
        container[0].style.display = "block"; // If it's hidden, show it
    }
}


