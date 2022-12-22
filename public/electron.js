// Native
const { exec } = require('child_process');
const { promisify } = require('util');
const { BrowserWindow, app, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { join } = require('path');
const execAsync = promisify(exec);
const path = require('path');
const fs = require('fs');
const { addMusic, togglePause, loadListMusic, playMusic, deleteMusic, deleteMusicRecent, loadListMusicRecent,
    jumpTimeMusic, stopMusic, getState, changeVolume, getValueVolume, saveUrlRecent,
    createPlayList, saveMusicIntoPlayList, loadPlayList, deletePlayList, saveLoveMusic, loadLoveMusic } = require('./handle.js');

function createWindow() {
    //Create server moc
    execAsync('mocp -S');

    // Create the browser window.
    const window = new BrowserWindow({
        //  change to false to use AppBar
        height: 900,
        width: 1600,
        frame: true,
        show: true,
        resizable: false,
        autoHideMenuBar: true,
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: true,
            preload: join(__dirname, 'preload.js'),
        },
    });

    window.maximize();

    window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    ipcMain.on('close', () => {
        //Close server moc
        execAsync('mocp -x');

        window.close();
    });

    ipcMain.handle('add-music', addMusic);
    ipcMain.handle('load-list-music', loadListMusic);
    ipcMain.handle('play-music', playMusic);
    ipcMain.handle('toggle-pause', togglePause);
    ipcMain.handle('jump-time-music', jumpTimeMusic);
    ipcMain.handle('stop-music', stopMusic);
    ipcMain.handle('change-volume', changeVolume);
    ipcMain.handle('get-value-volume', getValueVolume);
    ipcMain.handle('get-state', getState);
    ipcMain.handle('delete-music', deleteMusic);
    ipcMain.handle('add-recent-music', saveUrlRecent);
    ipcMain.handle('delete-recent-music', deleteMusicRecent);
    ipcMain.handle('load-recent-music', loadListMusicRecent);
    ipcMain.handle('create-playlist', createPlayList);
    ipcMain.handle('add-music-playlist', saveMusicIntoPlayList);
    ipcMain.handle('load-playlist', loadPlayList);
    ipcMain.handle('delete-playlist', deletePlayList);
    ipcMain.handle('save-love-music', saveLoveMusic);
    ipcMain.handle('load-love-music', loadLoveMusic);
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        //Close server moc
        execAsync('mocp -x');

        app.quit();
    }
});
