const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {

  const mainScreen = electron.screen.getPrimaryDisplay();
  const actualWidth = mainScreen.workArea.width;
  const actualHeight = mainScreen.workArea.height;

  mainWindow = new BrowserWindow({ width: actualWidth/2, height: 0.9*actualHeight });

  mainWindow.setResizable(false);
  mainWindow.setMaximizable(false);
  mainWindow.setMinimizable(false);

  // load the index.html of the app
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // emitted when the window is closed
  mainWindow.on('closed', function () {
    // dereference the window object
    mainWindow = null
  });

  mainWindow.webContents.on('new-window', function(event, url){
    event.preventDefault();
    electron.shell.openExternal(url);
  });
}

app.on('ready', createWindow);

// quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
