const { app, BrowserWindow, } = require('electron')
const fs = require('fs');
const path = require('path');


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height:800,
      webPreferences: {
        nodeIntegration: true, // Enable Node.js integration for this window
        preload: path.join(__dirname, 'preload.js'),
      },
    })
  
    win.loadFile('index.html')

  }
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


  app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
          //read the todo file and add to the list
        
          
    })


  })

  /*
  
  
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.disableHardwareAcceleration()
  */