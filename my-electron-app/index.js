const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        frame: false,
        fullscreen: true,
        resizable: false,
        icon: __dirname + '/assets/icons/appIcon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.once('ready-to-show', () => {
        win.webContents.setZoomFactor(1)
        win.show()
    })
    win.removeMenu()
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

// For live display of program
try {
    require('electron-reloader')(module);
} catch {}
