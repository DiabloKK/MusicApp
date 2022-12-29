import { imageDefault } from './imageDefault';

const PlayList = [];

const handle = async () => {
    const listName = await window.fileMp3API.loadNamePlayList();
    console.log(listName.length);
    for(var i=0; i<listName.length-1; i++) {
        var album = new Object();
        album.id = listName[i];
        album.albumName = listName[i];
        album.Songs = await window.fileMp3API.loadPlayList(listName[i]);
        if(album.Songs.length !== 0) {
            album.imgSrc = album.Songs[0]["Picture"];
        } else {
            album.imgSrc = imageDefault;
        }
        PlayList.push(album);
    }
}

handle();
console.log(PlayList);

export {PlayList};

