import redis from '../../libs/redis';
import Station from '../schemas/Station';

class StationController {
  async list(req, res) {
    const { page } = req.query;

    const cache = await redis.get(`all-${page}`);
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const results = await Station.paginate(
      { countryCode: 'br', active: true, streams: { $ne: [] } },
      { page, populate: ['city', 'region'] }
    );

    await redis.set(`all-${page}`, JSON.stringify(results));

    return res.json(results);
  }

  async index(req, res) {
    const { id } = req.params;

    const result = await Station.find({ id });

    return res.json(result);
  }
}

export default new StationController();
