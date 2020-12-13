import redis from '../../libs/redis';
import Station from '../schemas/Station';

class CloseController {
  async index(req, res) {
    const { radioId, genresIds } = req.params;
    const { page = 1 } = req.query;

    const cache = await redis.get(`close-${page}-${genresIds}-${radioId}`);
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    let genresIdsFormatted = '';

    try {
      genresIdsFormatted = JSON.parse(genresIds);
    } catch (e) {}

    const results = await Station.paginate(
      {
        genres: { $in: genresIdsFormatted.length ? genresIdsFormatted : [[]] },
        countryCode: 'br',
        active: true,
        streams: { $ne: [] },
        id: { $ne: radioId },
      },
      {
        page,
        populate: ['city', 'region'],
      }
    );

    results.items = results.items.sort(() => Math.random() - 0.5);

    const cacheExpirationInHours = 1;
    await redis.set(
      `close-${page}-${genresIds}-${radioId}`,
      JSON.stringify(results),
      'EX',
      60 * 60 * cacheExpirationInHours
    );

    return res.json(results);
  }
}

export default new CloseController();
