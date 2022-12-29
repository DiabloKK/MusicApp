// Native
const { exec } = require('child_process');
const { promisify } = require('util');
const { BrowserWindow, app, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const url = require('url');
const { join } = require('path');
const execAsync = promisify(exec);
const path = require('path');
const fs = require('fs');
const {
    addMusic,
    togglePause,
    loadListMusic,
    playMusic,
    deleteMusic,
    deleteMusicRecent,
    loadListMusicRecent,
    deleteMusicPlaylist,
    jumpTimeMusic,
    stopMusic,
    getState,
    changeVolume,
    getValueVolume,
    saveUrlRecent,
    loadNamePlayList,
    deleteMusicQueue,
    createPlayList,
    saveMusicIntoPlayList,
    loadPlayList,
    deletePlayList,
    saveQueueMusic,
    loadQueueMusic,
} = require('./handle.js');

function createWindow() {
    //Create server moc
    execAsync('mocp -S');

    //
    fs.writeFileSync('/home/noir/Desktop/PBL4-4/MusicApp/data/queueMusic.txt', '');

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
    // const appURL = app.isPackaged
    // ? url.format({
    //     pathname: "/home/noir/Desktop/PBL4-4/MusicApp/public/index.html",
    //     protocol: "file:",
    //     slashes: true,
    //   })
    // : "http://localhost:3000";
    // window.loadURL(appURL);

    ipcMain.on('close', () => {
        //Close server mocSS
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
    ipcMain.handle('save-queue-music', saveQueueMusic);
    ipcMain.handle('load-queue-music', loadQueueMusic);
    ipcMain.handle('delete-queue-music', deleteMusicQueue);
    ipcMain.handle('load-name-playlist', loadNamePlayList);
    ipcMain.handle('delete-music-playlist', deleteMusicPlaylist);
}

// function setupLocalFilesNormalizerProxy() {
//     protocol.registerHttpProtocol(
//       "file",
//       (request, callback) => {
//         const url = request.url.substr(8);
//         callback({ path: path.normalize(`${__dirname}/${url}`) });
//       },
//       (error) => {
//         if (error) console.error("Failed to register protocol");
//       }
//     );
//   }

app.whenReady().then(() => {
    createWindow();
    // setupLocalFilesNormalizerProxy();
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
