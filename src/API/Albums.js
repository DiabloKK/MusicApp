
const Albums = [];
const Artists = [];
var listMusic = [];
var nameAlbum = [];
var nameArtist = [];

const getListAlbum = async () => {
    listMusic = await window.fileMp3API.loadListMusic();

    for (var i=0; i<listMusic.length; i++) {

        var name = listMusic[i]["Artist"];
        if(!nameArtist.includes(name)) {
            nameArtist.push(name);

            var artist = new Object;

            artist.id = Artists.length + 1;
            artist.artist = name;
            artist.Songs = [];
            artist.Songs.push(listMusic[i]);
            artist.imgSrc = listMusic[i]["Picture"];

            Artists.push(artist);
        } else {
            const index = nameArtist.indexOf(name);
            Artists[index].Songs.push(listMusic[i]);
        }

        if(listMusic[i]["Album"] === undefined) continue;
        name = listMusic[i]["Album"].toString();
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

export { Albums, Artists };
