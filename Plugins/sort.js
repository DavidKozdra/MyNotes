

function sortOnAdd(coreApp) {
    coreApp.sort = () => {
        //get the list from core App
        //take the whole list 
        // sort 
        // then rewrite the list in the files 
    }
    coreApp.registerEventHandler("add", coreApp.sort)
}

module.exports = { sortOnAdd };