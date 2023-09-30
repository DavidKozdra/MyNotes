const fs = window.electron.require('fs');
const path = window.electron.require('path');
const __dirname = path.resolve();
const filePath = path.join(__dirname, 'test', 'test.txt');

const pluginSystem = window.electron.require('./plugins.js');

const pluginFolder = './Plugins'; // Path to your plugins folder

// Read all files in the plugins folder
fs.readdirSync(pluginFolder).forEach((file) => {
  const pluginFilePath = path.join(__dirname, pluginFolder, file);
  //get the file that is exported
  const plugin = window.electron.require(pluginFilePath);
  // plugin is an object but its first element is the exported function
  for (const key in plugin) {
    if (typeof plugin[key] === 'function') {
      // Add the first function found in the object to the list of plugins
      pluginSystem.registerPlugin(plugin[key]);
      break; // Exit the loop after finding the first function
    }
  }
});


let TodoInstance;


  document.addEventListener('DOMContentLoaded', function () {
    const resultSpan = document.getElementById('result');
    TodoInstance = pluginSystem.applyPlugins(new Todo());
    // Attach an event listener to a button element
    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function () {
      TodoInstance.addItem();
    });

    TodoInstance.renderList()

    // take all the notes in ToDO/test.txt and display them in the list

  });

  class Todo{
    
    constructor(){
      this.addItem = this.addItem.bind(this);
      this.registerEventHandler = this.registerEventHandler.bind(this);
      this.triggerEvent = this.triggerEvent.bind(this);
      this.getListOfNotes = this.getListOfNotes.bind(this);
      this.renderList = this.renderList.bind(this);
      this.eventRegistry = {};
    }
  
  registerEventHandler(eventName, handlerFunction) {
    if (!this.eventRegistry[eventName]) {
      this.eventRegistry[eventName] = [];
    }
    this.eventRegistry[eventName].push(handlerFunction);
  }
  
  // Trigger an event and execute associated handlers
  triggerEvent(eventName, eventData) {
    const handlers = this.eventRegistry[eventName];
    if (handlers) {
      handlers.map((handler) => {
        (handler)
        handler(eventData);
      })
    }
  }
  
    addItem(){
        
      var input = document.querySelector("input");
      var ul = document.querySelector("ul");
      var li = document.createElement("li");
      li.classList.add("listItem");

      if(input.value === ""){
          alert("You must write something!");
          return;
      }
      if(input.value.includes(",")){
          alert("You must not use commas!");
          return;
      }
      li.appendChild(document.createTextNode(input.value));
      ul.appendChild(li);
      fs.appendFile(filePath, ", "+input.value, (err) => {
          if (err) {
            console.error('Error writing file:', err);
            return;
          }
        });
        
      input.value = "";

      this.triggerEvent('add', this.addItem);
    }


    //gets an array of notes 
    getListOfNotes() {
      let notes = [];
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        notes = data.split(",");
      });
      
      return notes;
    } 
    

    renderList() {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        data = data.split(",");
        data.forEach(element => {
        // create a new note
        var ul = document.querySelector("ul");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(element));
        ul.appendChild(li);
        });
        input.value = "";
      });
    } 

  }