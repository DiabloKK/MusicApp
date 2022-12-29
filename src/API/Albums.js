
const Albums = [];
var listMusic = [];
var nameAlbum = [];

const getListAlbum = async () => {
    listMusic = await window.fileMp3API.loadListMusic();
    console.log(listMusic.length);
    for (var i=0; i<listMusic.length; i++) {
        if(listMusic[i]["Album"] === undefined) continue;
        const name = listMusic[i]["Album"].toString();
        if(!nameAlbum.includes(name)) {
            nameAlbum.push(name);

            var album = new Object();

            album.id = Albums.length + 1;
            album.albumName = name;
            album.Songs = [];
            album.Songs.push(listMusic[i]);
            album.imgSrc = listMusic[i]["Picture"];

            Albums.push(album);
        } else {
            const index = nameAlbum.indexOf(name);
            Albums[index].Songs.push(listMusic[i]);
        }
    }
}

getListAlbum();
console.log(Albums);

export { Albums };
