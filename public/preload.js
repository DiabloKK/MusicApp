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
});
