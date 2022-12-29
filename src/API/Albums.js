import { imageDefault } from './imageDefault';

const Albums = [];

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
        Albums.push(album);
    }
}

handle();
console.log(Albums);

export {Albums};

// const Albums = [
//     {
//         id: 'album1',
//         albumName: 'Yêu thích',
//         artist: 'SonTungMTP',
//         imgSrc: images.person6,
//         Songs: [
//             {
//                 id: 0,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'MONO',
//                 song: musics.mono0,
//                 imgSrc: images.person0,
//                 duration: '03:22',
//             },
//             {
//                 id: 1,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'Son Tung',
//                 song: musics.mono1,
//                 imgSrc: images.person1,
//                 duration: '04:12',
//             },
//             {
//                 id: 2,
//                 favourite: false,
//                 songName: 'Beast',
//                 artist: 'Anirudh Ravichander',
//                 song: musics.mono2,
//                 imgSrc: images.person2,
//                 duration: '03:51',
//             },
//             {
//                 id: 3,
//                 favourite: false,
//                 songName: 'Joker - Rock and Roll',
//                 artist: 'Jack5M',
//                 song: musics.mono3,
//                 imgSrc: images.person3,
//                 duration: '03:59',
//             },
//             {
//                 id: 4,
//                 favourite: false,
//                 songName: 'I Am A Peaky Blinder',
//                 artist: 'DatVNPHONE',
//                 song: musics.mono4,
//                 imgSrc: images.person4,
//                 duration: '05:12',
//             },
//         ],
//     },
//     {
//         id: 'album2',
//         albumName: '22',
//         artist: 'MONO',
//         imgSrc: images.person0,
//         Songs: [
//             {
//                 id: 0,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'MONO',
//                 song: musics.mono0,
//                 imgSrc: images.person0,
//                 duration: '03:22',
//             },
//             {
//                 id: 1,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'Son Tung',
//                 song: musics.mono1,
//                 imgSrc: images.person1,
//                 duration: '04:12',
//             },
//             {
//                 id: 2,
//                 favourite: false,
//                 songName: 'Beast',
//                 artist: 'Anirudh Ravichander',
//                 song: musics.mono2,
//                 imgSrc: images.person2,
//                 duration: '03:51',
//             },
//             {
//                 id: 3,
//                 favourite: false,
//                 songName: 'Joker - Rock and Roll',
//                 artist: 'Jack5M',
//                 song: musics.mono3,
//                 imgSrc: images.person3,
//                 duration: '03:59',
//             },
//             {
//                 id: 4,
//                 favourite: false,
//                 songName: 'I Am A Peaky Blinder',
//                 artist: 'DatVNPHONE',
//                 song: musics.mono4,
//                 imgSrc: images.person4,
//                 duration: '05:12',
//             },
//             {
//                 id: 5,
//                 favourite: false,
//                 songName: 'Naanga Vera Maari',
//                 artist: 'Yuvan Shankar Raja',
//                 song: musics.mono5,
//                 imgSrc: images.person5,
//                 duration: '03:02',
//             },
//             {
//                 id: 6,
//                 songName: 'Your Woman',
//                 artist: 'White Town',
//                 song: musics.mono6,
//                 imgSrc: images.person6,
//                 duration: '04:29',
//             },
//         ],
//     },
//     {
//         id: 'album3',
//         albumName: 'Thanh Xuan',
//         artist: 'Xuan Mai',
//         imgSrc: images.person1,
//         Songs: [
//             {
//                 id: 0,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'MONO',
//                 song: musics.mono0,
//                 imgSrc: images.person0,
//                 duration: '03:22',
//             },
//             {
//                 id: 1,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'Son Tung',
//                 song: musics.mono1,
//                 imgSrc: images.person1,
//                 duration: '04:12',
//             },
//             {
//                 id: 2,
//                 favourite: false,
//                 songName: 'Beast',
//                 artist: 'Anirudh Ravichander',
//                 song: musics.mono2,
//                 imgSrc: images.person2,
//                 duration: '03:51',
//             },
//             {
//                 id: 3,
//                 favourite: false,
//                 songName: 'Joker - Rock and Roll',
//                 artist: 'Jack5M',
//                 song: musics.mono3,
//                 imgSrc: images.person3,
//                 duration: '03:59',
//             },
//             {
//                 id: 4,
//                 favourite: false,
//                 songName: 'I Am A Peaky Blinder',
//                 artist: 'DatVNPHONE',
//                 song: musics.mono4,
//                 imgSrc: images.person4,
//                 duration: '05:12',
//             },
//             {
//                 id: 5,
//                 favourite: false,
//                 songName: 'Naanga Vera Maari',
//                 artist: 'Yuvan Shankar Raja',
//                 song: musics.mono5,
//                 imgSrc: images.person5,
//                 duration: '03:02',
//             },
//         ],
//     },
//     {
//         id: 'album4',
//         albumName: 'Skyler',
//         artist: 'SonTungMTP',
//         imgSrc: images.person3,
//         Songs: [
//             {
//                 id: 0,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'MONO',
//                 song: musics.mono0,
//                 imgSrc: images.person0,
//                 duration: '03:22',
//             },
//             {
//                 id: 1,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'Son Tung',
//                 song: musics.mono1,
//                 imgSrc: images.person1,
//                 duration: '04:12',
//             },
//             {
//                 id: 2,
//                 favourite: false,
//                 songName: 'Beast',
//                 artist: 'Anirudh Ravichander',
//                 song: musics.mono2,
//                 imgSrc: images.person2,
//                 duration: '03:51',
//             },
//             {
//                 id: 3,
//                 favourite: false,
//                 songName: 'Joker - Rock and Roll',
//                 artist: 'Jack5M',
//                 song: musics.mono3,
//                 imgSrc: images.person3,
//                 duration: '03:59',
//             },
//             {
//                 id: 4,
//                 favourite: false,
//                 songName: 'I Am A Peaky Blinder',
//                 artist: 'DatVNPHONE',
//                 song: musics.mono4,
//                 imgSrc: images.person4,
//                 duration: '05:12',
//             },
//         ],
//     },
//     {
//         id: 'album5',
//         albumName: '22',
//         artist: 'MONo',
//         imgSrc: images.person0,
//         Songs: [
//             {
//                 id: 0,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'MONO',
//                 song: musics.mono0,
//                 imgSrc: images.person0,
//                 duration: '03:22',
//             },
//             {
//                 id: 1,
//                 favourite: false,
//                 songName: 'Bella Ciao',
//                 artist: 'Son Tung',
//                 song: musics.mono1,
//                 imgSrc: images.person1,
//                 duration: '04:12',
//             },
//             {
//                 id: 2,
//                 favourite: false,
//                 songName: 'Beast',
//                 artist: 'Anirudh Ravichander',
//                 song: musics.mono2,
//                 imgSrc: images.person2,
//                 duration: '03:51',
//             },
//             {
//                 id: 3,
//                 favourite: false,
//                 songName: 'Joker - Rock and Roll',
//                 artist: 'Jack5M',
//                 song: musics.mono3,
//                 imgSrc: images.person3,
//                 duration: '03:59',
//             },
//             {
//                 id: 4,
//                 favourite: false,
//                 songName: 'I Am A Peaky Blinder',
//                 artist: 'DatVNPHONE',
//                 song: musics.mono4,
//                 imgSrc: images.person4,
//                 duration: '05:12',
//             },
//             {
//                 id: 5,
//                 favourite: false,
//                 songName: 'Naanga Vera Maari',
//                 artist: 'Yuvan Shankar Raja',
//                 song: musics.mono5,
//                 imgSrc: images.person5,
//                 duration: '03:02',
//             },
//             {
//                 id: 6,
//                 songName: 'Your Woman',
//                 artist: 'White Town',
//                 song: musics.mono6,
//                 imgSrc: images.person6,
//                 duration: '04:29',
//             },
//         ],
//     },
// ];

// export { Albums };
