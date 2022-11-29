// Native
const { exec } = require('child_process');
const { promisify } = require('util');
const { BrowserWindow, app, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { join } = require('path');
const execAsync = promisify(exec);
const path = require('path');
const fs = require("fs");


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

    window.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    ipcMain.on('close', () => {
        //Close server moc
        execAsync('mocp -x');

        window.close();
    });

    ipcMain.handle("add-music", addMusic);
    ipcMain.handle("load-list-music", loadListMusic);
    ipcMain.handle("play-music", playMusic);
    ipcMain.handle("toggle-pause", togglePause);
    ipcMain.handle("jump-time-music", jumpTimeMusic);
    ipcMain.handle("stop-music", stopMusic);
    ipcMain.handle("change-volume", changeVolume);
    ipcMain.handle("get-value-volume", getValueVolume);
    ipcMain.handle("get-state", getState); 

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

const imageDefault = "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";


const addMusic = async () => {
  const {stdout} = await execAsync("zenity --file-selection --file-filter=*.mp3");
  const infoFile = await saveUrl(stdout);
  console.log("fileMP3Handle: inside mehtod addMusic(), doi tuong tra ve component:")
  return infoFile;
}

const togglePause = async () => {
  try {
      await execAsync("mocp -G");      
  } catch (error) {
      console.log(error);
  }
}

const jumpTimeMusic = async (event, second) => {
  try {
      await execAsync("mocp -j " + second + "s");
  } catch (error) {
      console.log(error);        
  }
}

const stopMusic = async () => {
  try {
      await execAsync("mocp -s");
  } catch (error) {
      console.log(error);        
  }
}

const getState = async () => {
  try {
      const {stdout} = await execAsync("mocp -Q %state");       
      return stdout;
  } catch (error) {
      console.log(error);
  }
  return "";
}

const changeVolume = async (event, value) => {
  try {
      execAsync("amixer -D pulse sset Master " + value + "%");
  } catch (error) {
      console.log(error);        
  }
}

const getValueVolume = async () => {
  try {
      const {stdout} = await execAsync("amixer -D pulse sget Master | grep 'Left:' | awk -F'[][]' '{ print $2 }' |sed 's/[^0-9]//g'");

      return stdout;
  } catch (error) {
      console.log(error);  
  }
  return 0;
}

const loadListMusic = async () => {
    try {
        const data = await fs.readFileSync(path.join(__dirname, "/listUrlMusic.txt"));
        const listUrls = data.toString().split("\n");

        const cmd = "exiftool -artist -title -duration -picture -b -j " + listUrls.join(" ");
        const {stdout} = await execAsync(cmd);
        const listMusic = JSON.parse(stdout);
        for(let i=0; i<listMusic.length; i++) {
            listMusic[i]["id"] = i+1; 
            listMusic[i]["Duration"] = listMusic[i]["Duration"].split(" ")[0];
            listMusic[i]["Duration"] = listMusic[i]["Duration"].substring(2);
            if(listMusic[i]["Picture"] === undefined) {
                listMusic[i]["Picture"] = imageDefault;
            } else {
                listMusic[i]["Picture"] = listMusic[i]["Picture"].substring(7);
            }
        } 
   
        console.log("fileMP3Handle: inside method loadListMusic()");
        return listMusic;
        
        } catch (error) {
            console.log("2: " + error);
            return [];
    }
}

const saveUrl = async (url) => {
  try {
      const data = fs.readFileSync(path.join(__dirname, "/listUrlMusic.txt"));
      if(!data.toString().includes(url)) {
          console.log("fileMP3Handle: inside mehtod saveUrl(), message: thuc hien them url vao file(da tao)");
          return await appendUrlIntoFile(url);
      } else {
          console.log("fileMP3Handle: inside mehtod saveUrl(), message: url da ton tai!");
          return {};
      }
  } catch (error) {
      console.log("fileMP3Handle: inside mehtod saveUrl(), message: thuc hien them url vao file(chua tao)");
      return await appendUrlIntoFile(url);
  }
} 

const appendUrlIntoFile = async (url) =>
  new Promise((resolve, reject) => {
      fs.appendFile(path.join(__dirname, "/listUrlMusic.txt"), url, (err) => {
          if (err) {
              console.log("fileMP3Handle: inside mehtod appendUrlIntoFile(), loi khi them url vao file: " + err);
          } else {
              //Luu tru thanh cong
              console.log("fileMP3Handle: inside mehtod appendUrlIntoFile(), message: Luu url thanh cong");
              resolve(getInfoFile(url));
          }
      });
  });


const getInfoFile = async (url) => {
  const cmd = "exiftool -artist -title -duration -picture -b -j " + url; 
  
  try {
      const {stdout} = await execAsync(cmd);
      console.log("fileMP3Handle: inside mehtod getIntoFile(), thong tin doc duoc tu file: \n" + stdout);
      const infoFile = JSON.parse(stdout);
  
      infoFile[0]["Duration"] = infoFile[0]["Duration"].split(" ")[0];
      infoFile[0]["Duration"] = infoFile[0]["Duration"].substring(2);
      infoFile[0]["Duration"] = infoFile[0]["Duration"].split(" ")[0];
      if(infoFile[0]["Picture"] === undefined) {
          infoFile[0]["Picture"] = imageDefault;
          console.log(typeof(imageDefault));
      } else {
          infoFile[0]["Picture"] = infoFile[0]["Picture"].substring(7);
      }

      return infoFile[0];
  } catch (error) {
      console.log("fileMP3Handle: inside mehtod getIntoFile(), loi khi doc thong tin file: " + error);
  }
}

const playMusic = async (event, url) => {
  console.log("fileMP3Handle: inside method playMusic()");
  console.log(url);
  try {
      await execAsync("mocp -s");
      await execAsync("mocp -c");
      const cmd = "mocp -a " + url;
      await execAsync(cmd);
      await execAsync("mocp -p");        
  } catch (error) {
      console.log(error);
  }

}

