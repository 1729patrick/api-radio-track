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

      const results = await Station.paginate(
        {
          countryCode: 'br',
          active: true,

          $or: [
            // { $text: { $search: q } },
            {
              web: { $regex: q, $options: 'i' },
            },
            {
              name: { $regex: q, $options: 'i' },
            },
            {
              slogan: { $regex: q, $options: 'i' },
            },
          ],

          streams: { $ne: [] },
        },
        {
          page,
          populate: ['city', 'region'],
        }
      );

      if (results.items.length) {
        await redis.set(`search-${q}-${page}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Invalid search term.' });
    }
  }
}

export default new SearchController();
