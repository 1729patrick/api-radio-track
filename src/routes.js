import { Router } from 'express';

import StationController from './app/controllers/StationController';
import SearchController from './app/controllers/SearchController';
import GenreController from './app/controllers/GenreController';
import PlaylistController from './app/controllers/PlaylistController';

const router = Router();

router.get('/stations', StationController.list);
router.get('/stations/:id', StationController.index);
router.get('/search', SearchController.index);
router.get('/genres/:id', GenreController.index);
router.get('/playlists/random', PlaylistController.random);
router.get('/playlists/popular', PlaylistController.popular);
router.get('/playlists/recommends', PlaylistController.random);
router.get('/playlists/location', PlaylistController.location);

export default router;
