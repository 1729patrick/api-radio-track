import redis from '../../libs/redis';
import Region from '../schemas/Region';

class StationController {
  async index(req, res) {
    try {
      const { country } = req.params;

      const cache = await redis.get(`regions-${country}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      const results = await Region.find({ country }).sort({ name: 1 });

      const items = results.map(({ name, slug, id }) => ({
        id: slug,
        name,
        code: id,
      }));

      await redis.set(`regions-${country}`, JSON.stringify({ items }));

      return res.json({ items });
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new StationController();
