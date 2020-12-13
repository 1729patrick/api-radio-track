import redis from '../../libs/redis';
import Station from '../schemas/Station';

class SearchController {
  async index(req, res) {
    try {
      const { q, page = 1 } = req.query;

      const cache = await redis.get(`search-${q}-${page}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      if (q.length < 3) {
        throw new Error();
      }

      const qNormalized = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const results = await Station.paginate(
        {
          countryCode: 'br',
          active: true,
          name: {
            $in: [new RegExp(q, 'i'), new RegExp(qNormalized, 'i')],
          },
          streams: { $ne: [] },
        },
        {
          page,

          populate: ['city', 'region'],
        }
      );

      await redis.set(`search-${q}-${page}`, JSON.stringify(results));

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid search term.' });
    }
  }
}

export default new SearchController();
