import { Router } from 'express';

// import StationController from './app/controllers/StationController';
import SearchController from './app/controllers/SearchController';
import GenreController from './app/controllers/GenreController';
import PlaylistController from './app/controllers/PlaylistController';
import CloseController from './app/controllers/CloseController';
import LocationController from './app/controllers/LocationController';
import RedisController from './app/controllers/RedisController';
import UtilController from './app/controllers/UtilController';

const router = Router();

// router.get('/stations', StationController.list);
// router.get('/stations/:id', StationController.index);
router.get('/search', SearchController.index);
router.get('/genres/:id', GenreController.index);
router.get('/playlists/random', PlaylistController.random);
router.get('/playlists/popular', PlaylistController.popular);
router.get('/playlists/recommend', PlaylistController.recommend);
router.get('/playlists/location', PlaylistController.location);
router.get(
  '/playlists/region/:countryCode/:regionId',
  PlaylistController.region
);
router.get('/util/count', UtilController.count);
router.get('/util/requests/:size', UtilController.requests);
// router.get('/util', UtilController.index);
// router.get('/util/update/stations', UtilController.updateStations);

router.get('/radio/:radioId/closes/:genresIds', CloseController.index);
router.get(
  '/radio/:radioId/location/:countryCode/:regionId/:cityId',
  LocationController.index
);
router.post('/redis/reset', RedisController.index);

export default router;
