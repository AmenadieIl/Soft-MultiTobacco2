const { app, BrowserWindow } = require('electron');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('ASHXATOX.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', function () {
  createMainWindow();

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', function () {
    if (mainWindow === null) {
      createMainWindow();
    }
  });
});
