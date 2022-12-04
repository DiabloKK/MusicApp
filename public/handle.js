const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const path = require('path');
const fs = require('fs');
const {imageDefault} = require("./imageDefault.js")

    const addMusic = async () => {
        const { stdout } = await execAsync('zenity --file-selection --file-filter=*.mp3');
        const infoFile = await saveUrl(stdout);
        console.log('fileMP3Handle: inside mehtod addMusic(), doi tuong tra ve component:');
        return infoFile;
    };
    
    const togglePause = async () => {
        try {
            await execAsync('mocp -G');
        } catch (error) {
            console.log(error);
        }
    };
    
    const jumpTimeMusic = async (event, second) => {
        try {
            await execAsync('mocp -j ' + second + 's');
        } catch (error) {
            console.log(error);
        }
    };
    
    const stopMusic = async () => {
        try {
            await execAsync('mocp -s');
        } catch (error) {
            console.log(error);
        }
    };
    
    const getState = async () => {
        try {
            const { stdout } = await execAsync('mocp -Q %state');
            return stdout;
        } catch (error) {
            console.log(error);
        }
        return '';
    };
    
    const changeVolume = async (event, value) => {
        try {
            execAsync('amixer -D pulse sset Master ' + value + '%');
        } catch (error) {
            console.log(error);
        }
    };
    
    const getValueVolume = async () => {
        try {
            const { stdout } = await execAsync(
                "amixer -D pulse sget Master | grep 'Left:' | awk -F'[][]' '{ print $2 }' |sed 's/[^0-9]//g'",
            );
    
            return stdout;
        } catch (error) {
            console.log(error);
        }
        return 0;
    };
    
    const loadListMusic = async () => {
        try {
            const data = await fs.readFileSync(path.join(__dirname, '/listUrlMusic.txt'));
            const listUrls = data.toString().split('\n');
    
            const cmd = 'exiftool -artist -title -duration -picture -b -j ' + listUrls.join(' ');
            const { stdout } = await execAsync(cmd);
            const listMusic = JSON.parse(stdout);
            for (let i = 0; i < listMusic.length; i++) {
                listMusic[i]['id'] = i + 1;
                listMusic[i]['Duration'] = listMusic[i]['Duration'].split(' ')[0];
                listMusic[i]['Duration'] = listMusic[i]['Duration'].substring(2);
                if (listMusic[i]['Picture'] === undefined) {
                    listMusic[i]['Picture'] = imageDefault;
                } else {
                    listMusic[i]['Picture'] = listMusic[i]['Picture'].substring(7);
                }
            }
    
            console.log('fileMP3Handle: inside method loadListMusic()');
            return listMusic;
        } catch (error) {
            console.log('2: ' + error);
            return [];
        }
    };
    
    const saveUrl = async (url) => {
        try {
            const data = fs.readFileSync(path.join(__dirname, '/listUrlMusic.txt'));
            if (!data.toString().includes(url)) {
                console.log('fileMP3Handle: inside mehtod saveUrl(), message: thuc hien them url vao file(da tao)');
                return await appendUrlIntoFile(url);
            } else {
                console.log('fileMP3Handle: inside mehtod saveUrl(), message: url da ton tai!');
                return {};
            }
        } catch (error) {
            console.log('fileMP3Handle: inside mehtod saveUrl(), message: thuc hien them url vao file(chua tao)');
            return await appendUrlIntoFile(url);
        }
    };
    
    const appendUrlIntoFile = async (url) =>
        new Promise((resolve, reject) => {
            fs.appendFile(path.join(__dirname, '/listUrlMusic.txt'), url, (err) => {
                if (err) {
                    console.log('fileMP3Handle: inside mehtod appendUrlIntoFile(), loi khi them url vao file: ' + err);
                } else {
                    //Luu tru thanh cong
                    console.log('fileMP3Handle: inside mehtod appendUrlIntoFile(), message: Luu url thanh cong');
                    resolve(getInfoFile(url));
                }
            });
        });
    
    const getInfoFile = async (url) => {
        const cmd = 'exiftool -artist -title -duration -picture -b -j ' + url;
    
        try {
            const { stdout } = await execAsync(cmd);
            console.log('fileMP3Handle: inside mehtod getIntoFile(), thong tin doc duoc tu file: \n' + stdout);
            const infoFile = JSON.parse(stdout);
    
            infoFile[0]['Duration'] = infoFile[0]['Duration'].split(' ')[0];
            infoFile[0]['Duration'] = infoFile[0]['Duration'].substring(2);
            infoFile[0]['Duration'] = infoFile[0]['Duration'].split(' ')[0];
            if (infoFile[0]['Picture'] === undefined) {
                infoFile[0]['Picture'] = imageDefault;
                console.log(typeof imageDefault);
            } else {
                infoFile[0]['Picture'] = infoFile[0]['Picture'].substring(7);
            }
    
            return infoFile[0];
        } catch (error) {
            console.log('fileMP3Handle: inside mehtod getIntoFile(), loi khi doc thong tin file: ' + error);
        }
    };
    
    const playMusic = async (event, url) => {
        console.log('fileMP3Handle: inside method playMusic()');
        console.log(url);
        try {
            await execAsync('mocp -s');
            await execAsync('mocp -c');
            const cmd = 'mocp -a ' + url;
            await execAsync(cmd);
            await execAsync('mocp -p');
        } catch (error) {
            console.log(error);
        }
    };
    
    const deleteMusic = async (event, url) => {
        try {
            let data = await fs.readFileSync(path.join(__dirname, '/listUrlMusic.txt'));
            data = data.toString();
            data = data.replace(url, '');
            await fs.writeFileSync(path.join(__dirname, '/listUrlMusic.txt'), data);
        } catch (error) {
            console.log(error);
        }
    };
    

module.exports = {
    imageDefault, addMusic, togglePause, loadListMusic, playMusic, deleteMusic,
     jumpTimeMusic, stopMusic, getState, changeVolume, getValueVolume,
};
