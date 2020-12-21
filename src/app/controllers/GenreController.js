import redis from '../../libs/redis';
import Station from '../schemas/Station';

class GenreController {
  async index(req, res) {
    try {
      const { id } = req.params;
      const { page = 1 } = req.query;

      const cache = await redis.get(`genres-${id}-${page}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      let genresIds = '';

      try {
        genresIds = JSON.parse(id);
      } catch (e) {}

      const results = await Station.paginate(
        {
          genres: { $in: genresIds },
          countryCode: 'br',
          active: true,
          streams: { $ne: [] },
        },
        { page, populate: ['city', 'region'] }
      );

      if (results?.items?.length) {
        await redis.set(`genres-${id}-${page}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new GenreController();
