import redis from '../../libs/redis';
import Station from '../schemas/Station';

class StationController {
  async list(req, res) {
    try {
      const { page } = req.query;

      const cache = await redis.get(`all-${page}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      const results = await Station.paginate(
        { countryCode: 'br', active: true, streams: { $ne: [] } },
        { page, populate: ['city', 'region'] }
      );

      if (results?.items?.length) {
        await redis.set(`all-${page}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async index(req, res) {
    try {
      const { id } = req.params;

      const result = await Station.find({ id });

      return res.json(result);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new StationController();
