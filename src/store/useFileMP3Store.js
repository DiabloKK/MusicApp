import create from "zustand";


export const useFileMP3Store = create((set, get) => ({
    async addMusic() {
        const itemMusic = await window.fileMp3API.addMusic();
        console.log("useFileMP3Store: inside method addMusic(), itemMusic:\n");
        return itemMusic;
    },
    async loadListMusic() {
        const listMusic = await window.fileMp3API.loadListMusic();
        console.log("useFileMP3Store: inside method loadListMusic(), listMusic:\n");
        return listMusic;
    },
    async playMusic(url) {
        await window.fileMp3API.playMusic(url);
    },
    async togglePause() {
        await window.fileMp3API.togglePause();
    },
    async jumpTimeMusic(second) {
        await window.fileMp3API.jumpTimeMusic(second);
    },
    async stopMusic() {
        await window.fileMp3API.stopMusic();
    },
    async getState() {
        let state = await window.fileMp3API.getState();
        state = state.substring(0,4);
        return state;
    },
    async changeVolume(value) {
        await window.fileMp3API.changeVolume(value);
    },
    async getValueVolume() {
        const valueVolume = await window.fileMp3API.getValueVolume();
        return valueVolume;
    }
}));