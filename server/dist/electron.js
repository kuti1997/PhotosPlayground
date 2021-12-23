"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const photosHandler_1 = require("./src/photosHandler");
const electron_2 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
let win;
function createWindow() {
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path_1.default.join(__dirname, "preload.js")
        },
    });
    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(electron_is_dev_1.default
        ? 'http://localhost:3000'
        : `file://${path_1.default.join(__dirname, '../build/index.html')}`);
    // Open the DevTools.
    if (electron_is_dev_1.default) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_2.app.whenReady().then(createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_2.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_2.app.quit();
    }
});
electron_2.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_2.ipcMain.on("toMain", (_, args) => {
    const response = (0, photosHandler_1.processPhotosConfig)();
    win.webContents.send("fromMain", response);
});
//# sourceMappingURL=electron.js.map