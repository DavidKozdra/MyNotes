

function testPlugin(coreApp) {
    coreApp.registerEventHandler("add", addItem)
    coreApp.test = () => {
        alert("Test");
    }

    function addItem() {
        alert("item added");
    }
    coreApp.test();
}

module.exports = { testPlugin };