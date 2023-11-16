'use strict'

const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');

let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: true,
    webPreferences: {preload: path.join(__dirname, 'preload.js'),}
  })
  window.loadFile(path.join(__dirname,'..','renderer','index.html'));
  window.show();
  window.focus();
  window.on('closed', () => {
    mainWindow = null
  })

  return window
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})
app.on('ready', () => {
  mainWindow = createMainWindow()
})
