const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 576,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL(`http://localhost:8000`);

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  mainWindow.setMenu(null);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});

// server ----------------------------------------------------
var serverStart = require('./dist/server.bundle.js');