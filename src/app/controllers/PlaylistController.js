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
      {
        countryCode: 'br',
        active: true,
        streams: { $ne: [] },
        img: { $ne: null },
      },
      {
        page,
        populate: ['city', 'region'],
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
      {
        countryCode: 'br',
        active: true,
        streams: { $ne: [] },
        img: { $ne: null },
      },
      {
        page,

        sort: { 'votes.up': 'desc' },
        populate: ['city', 'region'],
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
      {
        countryCode: 'br',
        active: true,
        streams: { $ne: [] },
        img: { $ne: null },
      },
      {
        page,

        populate: ['city', 'region'],
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
      {
        countryCode: 'br',
        active: true,
        streams: { $ne: [] },
        img: { $ne: null },
      },
      {
        page,

        populate: ['city', 'region'],
      }
    );

    await redis.set(`recommend-${page}`, JSON.stringify(results));

    return res.json(results);
  }

  async region(req, res) {
    const { regionId } = req.params;
    const { page = 1 } = req.query;

    const cache = await redis.get(`region-${page}-${regionId}`);
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const results = await Station.paginate(
      {
        countryCode: 'br',
        active: true,
        regionId,
        streams: { $ne: [] },
        img: { $ne: null },
      },
      {
        page,
        populate: ['city', 'region'],
      }
    );

    await redis.set(`region-${page}-${regionId}`, JSON.stringify(results));

    return res.json(results);
  }
}

export default new PlaylistController();
