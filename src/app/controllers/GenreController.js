import redis from '../../libs/redis';
import Station from '../schemas/Station';

class GenreController {
  async index(req, res) {
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
      { genres: { $in: genresIds }, countryCode: 'br', active: true, streams: { $ne: [] } },
      { page, populate: ['city', 'region'] }
    );

    await redis.set(`genres-${id}-${page}`, JSON.stringify(results));

    return res.json(results);
  }
}

export default new GenreController();
