const { app, BrowserWindow, screen} = require('electron');
const path = require('path');

function createWindow () {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        fullscreen: true,
        resizable: false,
        icon: __dirname + '/assets/gameIcons/appIcon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.removeMenu()
    win.once('ready-to-show', () => {
        win.webContents.setZoomFactor(1)
        win.show()
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('browser-window-blur', () => {

})

app.on('browser-window-focus', () => {

})

// For live display of program
try {
    require('electron-reloader')(module);
} catch {}

