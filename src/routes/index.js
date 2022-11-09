import config from '~/config';

import Home from '~/pages/Home';
import PlayQueue from '~/pages/PlayQueue';
import MusicLibrary from '~/pages/MusicLibrary';
import Setting from '~/pages/Setting';
import PlayList from '~/pages/PlayList';

//public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.playList, component: PlayList },
    { path: config.routes.playQueue, component: PlayQueue },
    { path: config.routes.musicLiBrary, component: MusicLibrary },
    { path: config.routes.setting, component: Setting, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
