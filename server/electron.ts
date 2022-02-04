import { BrowserWindow, remote } from "electron";
import path from 'path';
import { processPhotosConfig } from './src/simulationRequestHandler';
import { app, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import { ApplySimulationRequest, GetSimulationRequest, SEND_TO_CLIENT_CHANNELS, SEND_TO_SERVER_CHANNELS } from "shared-modules";
import { applySimulationRequest } from "./src/applySimulationRequestHandler";

let win: BrowserWindow;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 550,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    },
    frame: false
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on(SEND_TO_SERVER_CHANNELS.GET_SIMULATION, async (_, request: GetSimulationRequest) => {
  try {
    const response = await processPhotosConfig(request);
    win.webContents.send(SEND_TO_CLIENT_CHANNELS.SIMULATION_RESULTS, response);
  }
  catch (e) {
    console.log(e);
  }
});

ipcMain.on(SEND_TO_SERVER_CHANNELS.APPLY_SIMULATION, (_, request: ApplySimulationRequest) => {
  try {
    const response = applySimulationRequest(request);
    win.webContents.send(SEND_TO_CLIENT_CHANNELS.SIMULATION_RESULTS, response);
  }
  catch (e) {
    console.log(e);
  }
});

ipcMain.on(SEND_TO_SERVER_CHANNELS.CLOSE_SERVER, () => {
  console.log("Aaa")
  win.destroy();
});