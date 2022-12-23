const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const path = require('path');
const fs = require('fs');
const {imageDefault} = require("./imageDefault.js");

    const addMusic = async () => {
        const { stdout } = await execAsync('zenity --multiple --file-selection --file-filter=*.mp3');
        console.log(stdout);
        const array_pathFile = stdout.split("|");

        const array_music = [];
        array_pathFile.forEach(async path => {
            const infoFile = await saveUrl(path + "\n");
            array_music.push(infoFile);
        });

        console.log('fileMP3Handle: inside mehtod addMusic(), doi tuong tra ve component:');
        return array_music;
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
            const data = await fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/listUrlMusic.txt"));
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

    const loadListMusicRecent = async () => {
        try {
            console.log("loadRecentMusic in electron");
            const data = await fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/recentMusic.txt"));
            const listUrls = data.toString().split('\n');
    
            const cmd = 'exiftool -artist -title -duration -picture -b -j ' + listUrls.join(' ');
            const { stdout } = await execAsync(cmd);
            const listMusic = JSON.parse(stdout);
            for (let i = 0; i < listMusic.length; i++) {
                listMusic[i]['id'] = listMusic.length - i;
                listMusic[i]['Duration'] = listMusic[i]['Duration'].split(' ')[0];
                listMusic[i]['Duration'] = listMusic[i]['Duration'].substring(2);
                if (listMusic[i]['Picture'] === undefined) {
                    listMusic[i]['Picture'] = imageDefault;
                } else {
                    listMusic[i]['Picture'] = listMusic[i]['Picture'].substring(7);
                }
            }
    
            console.log('fileMP3Handle: inside method loadListMusicRecent()');
            return listMusic;
        } catch (error) {
            console.log('2: ' + error);
            return [];
        }
    }; 

    const loadPlayList = async (event, name) => {
        try {
            console.log("loadPlayList in electron");
            const data = await fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/" + name + ".txt"));
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
    
            console.log('fileMP3Handle: inside method loadListPlayList()');
            return listMusic;
        } catch (error) {
            console.log('2: ' + error);
            return [];
        }
    }

    const loadQueueMusic = async () => {
        try {
            console.log("loadLoveMusic in electron");
            const data = await fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/queueMusic.txt"));
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
    
            console.log('fileMP3Handle: inside method loadLoveMusic()');
            return listMusic;
        } catch (error) {
            console.log('2: ' + error);
            return [];
        }
    }; 
    
    const saveUrl = async (url) => {
        try {
            const data = fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/listUrlMusic.txt"));
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
            fs.appendFile(path.join(__dirname.replace("public","src"), "/API/listUrlMusic.txt"), url, (err) => {
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
            let data = await fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/listUrlMusic.txt"));
            data = data.toString();
            data = data.replace(url + '\n', '');
            await fs.writeFileSync(path.join(__dirname.replace("public","src"), "/API/listUrlMusic.txt"), data);
        } catch (error) {
            console.log(error);
        }
    };

    const appendUrlIntoRecentMusic = async (url) => {   
        console.log(url);
        fs.appendFileSync(path.join(__dirname.replace("public","src"), "/API/recentMusic.txt"), url + "\n");
    }
    
    const saveUrlRecent = async (event, url) => {
        try {
            const data = fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/recentMusic.txt"));
            if (!data.toString().includes(url)) {
                console.log('fileMP3Handle: inside mehtod saveUrlRecent(), message: thuc hien them url vao file(da tao)');
                await appendUrlIntoRecentMusic(url);
                console.log(data.toString().split("\n")[0]);
                if(data.toString().split("\n").length > 10) {
                    deleteMusicRecent(null, data.toString().split("\n")[0]);
                }
            } else {
                console.log('fileMP3Handle: inside mehtod saveUrlRecent(), message: url da ton tai!');
            }
        } catch (error) {
            console.log(error);
        } 
    }

    const deleteMusicRecent = async (event, url) => {
        try {
            let data = await fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/recentMusic.txt"));
            data = data.toString();
            data = data.replace(url + '\n', '');
            await fs.writeFileSync(path.join(__dirname.replace("public","src"), "/API/recentMusic.txt"), data);
        } catch (error) {
            console.log(error);
        }
    };

    const createPlayList = async (event, name) => {
        console.log(name);
        fs.writeFileSync(path.join(__dirname.replace("public","src"), "/API/" + name + ".txt"), "");
        saveNamePlayList(name);
    };

    const deletePlayList = async (event, name) => {
        fs.unlinkSync(path.join(__dirname.replace("public","src"), "/API/" + name + ".txt"));
    }

    const appendUrlIntoPlayListMusic = async (name, url) => {
        console.log(url);
        console.log(name);
        fs.appendFileSync(path.join(__dirname.replace("public","src"), "/API/" + name + ".txt"), url + "\n");
    }

    const appendUrlIntoQueueMusic = async (url) => {
        console.log(url);
        fs.appendFileSync(path.join(__dirname.replace("public","src"), "/API/queueMusic.txt"), url + "\n");
    }

    const appendNameIntoListPlayList = async (name) => {
        console.log(name);
        fs.appendFileSync(path.join(__dirname.replace("public","src"), "/API/listPlayList.txt"), name + "\n");
    }

    const saveMusicIntoPlayList = async (event, name, url) => {
        try {
            const data = fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/" + name + ".txt"));
            if (!data.toString().includes(url)) {
                console.log('fileMP3Handle: inside mehtod saveMusicIntoPlayList(), message: thuc hien them url vao file(da tao)');
                await appendUrlIntoPlayListMusic(name, url);
            } else {
                console.log('fileMP3Handle: inside mehtod saveMusicIntoPlayList(), message: url da ton tai!');
            }
        } catch (error) {
            console.log(error);
        } 
    }

    const saveQueueMusic = async (event, url) => {
        try {
            const data = fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/queueMusic.txt"));
            if (!data.toString().includes(url)) {
                console.log('fileMP3Handle: inside mehtod saveQueueMusic(), message: thuc hien them url vao file(da tao)');
                await appendUrlIntoQueueMusic(url);
            } else {
                console.log('fileMP3Handle: inside mehtod saveQueueMusic(), message: url da ton tai!');
            }
        } catch (error) {
            console.log(error);
        } 
    }

    const saveNamePlayList = async (name) => {
        try {
            const data = fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/listPlayList.txt"));
            if (!data.toString().includes(name+'\n')) {
                console.log('fileMP3Handle: inside mehtod saveNamePlayList(), message: thuc hien them url vao file(da tao)');
                await appendNameIntoListPlayList(name);
            } else {
                console.log('fileMP3Handle: inside mehtod saveNamePlayList(), message: url da ton tai!');
            }
        } catch (error) {
            console.log(error);
        } 
    }

    const loadNamePlayList = async () => {
        const data = fs.readFileSync(path.join(__dirname.replace("public","src"), "/API/listPlayList.txt"));
        console.log(data.toString());
        return data.toString();
    }

module.exports = {
    imageDefault, addMusic, togglePause, loadListMusic, playMusic, deleteMusic, loadListMusicRecent,
     jumpTimeMusic, stopMusic, getState, changeVolume, getValueVolume, saveUrlRecent, deleteMusicRecent,
     createPlayList, saveMusicIntoPlayList, loadPlayList, deletePlayList, saveQueueMusic, loadQueueMusic, loadNamePlayList
};
