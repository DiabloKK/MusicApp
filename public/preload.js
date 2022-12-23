const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fileMp3API', {
    addMusic: () => {
        return ipcRenderer.invoke('add-music');
    },
    loadListMusic: () => {
        return ipcRenderer.invoke('load-list-music');
    },
    playMusic: (url) => {
        return ipcRenderer.invoke('play-music', url);
    },
    togglePause: () => {
        ipcRenderer.invoke('toggle-pause');
    },
    jumpTimeMusic: (second) => {
        ipcRenderer.invoke('jump-time-music', second);
    },
    stopMusic: () => {
        ipcRenderer.invoke('stop-music');
    },
    getState: () => {
        return ipcRenderer.invoke('get-state');
    },
    changeVolume: (value) => {
        ipcRenderer.invoke('change-volume', value);
    },
    getValueVolume: () => {
        return ipcRenderer.invoke('get-value-volume');
    },
    deleteMusic: (url) => {
        ipcRenderer.invoke('delete-music', url);
    },
    addRecentMusic: (url) => {
        ipcRenderer.invoke('add-recent-music', url);
    },
    deleteRecentMusic: (url) => {
        ipcRenderer.invoke('delete-recent-music', url);
    },
    loadRecentMusic: () => {
        return ipcRenderer.invoke('load-recent-music');
    },
    createPlayList: (name) => {
        ipcRenderer.invoke('create-playlist', name);
    },
    addMusicPlayList: (name, url) => {
        ipcRenderer.invoke('add-music-playlist', name, url);
    },
    loadPlayList: (name) => {
        return ipcRenderer.invoke('load-playlist', name);
    },
    deletePlayList: (name) => {
        ipcRenderer.invoke('delete-playlist', name);
    },
    addQueueMusic: (url) => {
        ipcRenderer.invoke('save-queue-music', url);
    },
    loadQueueMusic: () => {
        return ipcRenderer.invoke('load-queue-music');
    },
    loadNamePlayList: () => {
        return ipcRenderer.invoke('load-name-playlist');
    }
});
