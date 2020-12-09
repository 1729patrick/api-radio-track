import Station from '../schemas/Station';
import redis from '../../libs/redis';

class CloseController {
  async index(req, res) {
    const { radioId, genresIds } = req.params;
    const { page = 1 } = req.query;

    const cache = await redis.get(`close-${page}-${radioId}-${genresIds}`);
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    let genresIdsFormatted = '';

    try {
      genresIdsFormatted = JSON.parse(genresIds);
    } catch (e) {}

    const results = await Station.paginate(
      {
        genres: { $in: genresIdsFormatted },
        countryCode: 'br',
        streams: { $ne: [] },
        id: { $ne: radioId },
      },
      {
        page,
        populate: 'city',
      }
    );

    results.items = results.items.sort(() => Math.random() - 0.5);

    await redis.set(
      `close-${page}-${radioId}-${genresIds}`,
      JSON.stringify(results)
    );

    return res.json(results);
  }
}

export default new CloseController();
