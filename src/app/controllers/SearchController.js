import redis from '../../libs/redis';
import { diacriticSensitiveRegex } from '../../util/adistinctRegexSensitive';
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

      const $regex = diacriticSensitiveRegex(q);
      const results = await Station.paginate(
        {
          countryCode: 'br',
          active: true,
          streams: { $ne: [] },
          $or: [
            // { $text: { $search: q } },
            {
              web: { $regex, $options: 'i' },
            },
            {
              name: { $regex, $options: 'i' },
            },
            {
              slogan: { $regex, $options: 'i' },
            },
          ],
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
