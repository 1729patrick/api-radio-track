import Station from '../schemas/Station';
import redis from '../../libs/redis';

class PlaylistController {
  async random(req, res) {
    try {
      let { page = 1, countryCode = 'br' } = req.query;

      const cache = await redis.get(`random-${countryCode}-${page}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      const results = await Station.paginate(
        {
          countryCode,
          //active: true,
          streams: { $ne: [] },
          img: { $ne: null },
        },
        {
          page,
          populate: ['city', 'region'],
        }
      );

      if (results?.items?.length) {
        await redis.set(
          `random-${countryCode}-${page}`,
          JSON.stringify(results)
        );
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async popular(req, res) {
    try {
      let { page = 1, countryCode = 'br' } = req.query;

      const cache = await redis.get(`popular-${countryCode}-${page}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      const results = await Station.paginate(
        {
          countryCode,
          //active: true,
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
        await redis.set(
          `popular-${countryCode}-${page}`,
          JSON.stringify(results)
        );
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async location(req, res) {
    try {
      let { page = 1, countryCode = 'br' } = req.query;

      const cache = await redis.get(`location-${countryCode}-${page}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      const results = await Station.paginate(
        {
          countryCode,
          //active: true,
          streams: { $ne: [] },
          img: { $ne: null },
        },
        {
          page,
          populate: ['city', 'region'],
        }
      );

      if (results?.items?.length) {
        await redis.set(
          `location-${countryCode}-${page}`,
          JSON.stringify(results)
        );
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async recommend(req, res) {
    try {
      let { page = 1, countryCode = 'br' } = req.query;

      const cache = await redis.get(`recommend-${countryCode}-${page}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      const results = await Station.paginate(
        {
          countryCode,
          //active: true,
          streams: { $ne: [] },
          img: { $ne: null },
        },
        {
          page,
          populate: ['city', 'region'],
        }
      );

      if (results?.items?.length) {
        await redis.set(
          `recommend-${countryCode}-${page}`,
          JSON.stringify(results)
        );
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async region(req, res) {
    try {
      let {
        page = 1,
        countryCode = 'br',
        regionId = req.params.regionId,
      } = req.query;

      const cache = await redis.get(
        `region-${countryCode}-${page}-${regionId}`
      );
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      const results = await Station.paginate(
        {
          countryCode,
          //active: true,
          regionId: regionId || 'not_found',
          streams: { $ne: [] },
          img: { $ne: null },
        },
        {
          page,
          populate: ['city', 'region'],
        }
      );

      if (results?.items?.length) {
        await redis.set(
          `region-${countryCode}-${page}-${regionId}`,
          JSON.stringify(results)
        );
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new PlaylistController();
