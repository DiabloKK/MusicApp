import { useState, createContext, useEffect } from 'react';
import { useFileMP3Store } from '~/store/useFileMP3Store';
import { imageDefault } from '~/API/imageDefault';

const SongContext = createContext();

function SongProvider({ children }) {
    const { loadListMusic } = useFileMP3Store();
    const [song, setSong] = useState([]);
    const [pathSong, setPathSong] = useState('');
    const [count, setCount] = useState(0);
    const [ListPlaylist, setListPlaylist] = useState([]);

    const [ListAlbum, setListAlbum] = useState([]);
    const [ListArtist, setListArtist] = useState([]);

    useEffect(() => {
        const load = async () => {
            const list = await loadListMusic();
            setSong(list[0]);
        };

        load();
    }, []);
    useEffect(() => {
        const handle = async () => {
            const PlayLists = [];

            const listName = await window.fileMp3API.loadNamePlayList();
            console.log(listName.length);
            for (var i = 0; i < listName.length - 1; i++) {
                var album = new Object();
                album.id = listName[i];
                album.albumName = listName[i];
                album.Songs = await window.fileMp3API.loadPlayList(listName[i]);
                if (album.Songs.length !== 0) {
                    album.imgSrc = album.Songs[0]['Picture'];
                } else {
                    album.imgSrc = imageDefault;
                }
                PlayLists.push(album);
            }
            console.log(PlayLists);
            setListPlaylist(PlayLists);
            console.log(ListPlaylist);
        };

        handle();
    }, [count]);

    useEffect(() => {
        const Albums = [];
        const Artists = [];
        var listMusic = [];
        var nameAlbum = [];
        var nameArtist = [];
        const getListAlbum = async () => {
            listMusic = await window.fileMp3API.loadListMusic();
            console.log(listMusic.length);
            for (var i = 0; i < listMusic.length; i++) {
                var name = listMusic[i]['Artist'];
                if (!nameArtist.includes(name)) {
                    nameArtist.push(name);

                    var artist = new Object();

                    artist.id = Artists.length + 1;
                    artist.artist = name;
                    artist.Songs = [];
                    listMusic[i].id = 1;
                    artist.Songs.push(listMusic[i]);
                    artist.imgSrc = listMusic[i]['Picture'];

                    Artists.push(artist);
                } else {
                    const index = nameArtist.indexOf(name);
                    listMusic[i].id = Artists[index].Songs.length + 1;
                    Artists[index].Songs.push(listMusic[i]);
                }

                if (listMusic[i]['Album'] === undefined) continue;
                name = listMusic[i]['Album'].toString();
                if (!nameAlbum.includes(name)) {
                    nameAlbum.push(name);

                    var album = new Object();

                    album.id = Albums.length + 1;
                    album.albumName = name;
                    album.Songs = [];
                    listMusic[i].id = 1;
                    album.Songs.push(listMusic[i]);
                    album.imgSrc = listMusic[i]['Picture'];

                    Albums.push(album);
                } else {
                    const index = nameAlbum.indexOf(name);
                    listMusic[i].id = Albums[index].Songs.length + 1;
                    Albums[index].Songs.push(listMusic[i]);
                }
            }
            setListAlbum(Albums);
            setListArtist(Artists);
            console.log(Artists);
        };

        getListAlbum();
    }, [count]);

    const ChangeSong = (songCurrent) => {
        setSong(songCurrent);
    };
    const ChangePathSong = (pathSongCurrent) => {
        setPathSong(pathSongCurrent);
    };
    const ChangeCount = (count) => {
        setCount(count);
    };
    const value = {
        count,
        song,
        pathSong,
        ListPlaylist,
        ListArtist,
        ListAlbum,
        ChangeCount,
        ChangeSong,
        ChangePathSong,
    };

    return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}

export { SongContext, SongProvider };
