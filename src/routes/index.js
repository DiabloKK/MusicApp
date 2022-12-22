import config from '~/config';

import Home from '~/pages/Home';
import PlayQueue from '~/pages/PlayQueue';
import MusicLibrary from '~/pages/MusicLibrary';

import PlayList from '~/pages/PlayList';

//public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.playList, component: PlayList },
    { path: config.routes.playQueue, component: PlayQueue },
    { path: config.routes.musicLiBrary, component: MusicLibrary },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
