import Station from '../schemas/Station';
import redis from '../../libs/redis';

class PlaylistController {
  async random(req, res) {
    const { page = 1 } = req.query;

    const cache = await redis.get(`random-${page}`);
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const results = await Station.paginate(
      { countryCode: 'br', streams: { $ne: [] } },
      {
        page,
        select: '-frecuencies -programming',
        populate: 'city',
      }
    );

    await redis.set(`random-${page}`, JSON.stringify(results));

    return res.json(results);
  }

  async popular(req, res) {
    const { page = 1 } = req.query;

    const cache = await redis.get(`popular-${page}`);
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const results = await Station.paginate(
      { countryCode: 'br', streams: { $ne: [] } },
      {
        page,
        select: '-frecuencies -programming',
        sort: { 'votes.up': 'desc' },
        populate: 'city',
      }
    );

    await redis.set(`popular-${page}`, JSON.stringify(results));

    return res.json(results);
  }

  async location(req, res) {
    const { page = 1 } = req.query;

    const cache = await redis.get(`location-${page}`);
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const results = await Station.paginate(
      { countryCode: 'br', streams: { $ne: [] } },
      {
        page,
        select: '-frecuencies -programming',
        populate: 'city',
      }
    );

    await redis.set(`location-${page}`, JSON.stringify(results));

    return res.json(results);
  }

  async recommend(req, res) {
    const { page = 1 } = req.query;

    const cache = await redis.get(`recommend-${page}`);
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const results = await Station.paginate(
      { countryCode: 'br', streams: { $ne: [] } },
      {
        page,
        select: '-frecuencies -programming',
        populate: 'city',
      }
    );

    await redis.set(`recommend-${page}`, JSON.stringify(results));

    return res.json(results);
  }
}

export default new PlaylistController();
