import Station from '../schemas/Station';
import redis from '../../libs/redis';

class PlaylistController {
  async random(req, res) {
    try {
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

      if (results?.items?.length) {
        await redis.set(`random-${page}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async popular(req, res) {
    try {
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

      if (results?.items?.length) {
        await redis.set(`popular-${page}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async location(req, res) {
    try {
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

      if (results?.items?.length) {
        await redis.set(`location-${page}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async recommend(req, res) {
    try {
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

      if (results?.items?.length) {
        await redis.set(`recommend-${page}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async region(req, res) {
    try {
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

      if (results?.items?.length) {
        await redis.set(`region-${page}-${regionId}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new PlaylistController();
