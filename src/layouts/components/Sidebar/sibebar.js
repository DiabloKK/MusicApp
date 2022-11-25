import { HomeIcon, PlayListIcon, PlayQueueIcon, MusicLiBraryIcon } from '~/assets/icons';

const menu = [
    { id: 1, title: 'Home', icon: <HomeIcon />, link: '/' },
    { id: 2, title: 'Music library', icon: <MusicLiBraryIcon />, link: '/musicLibrary' },
    { id: 3, title: 'Playqueue', icon: <PlayQueueIcon />, link: '/playQueue' },
    { id: 4, title: 'Playlist', icon: <PlayListIcon />, link: '/playList' },
];
export default menu;
