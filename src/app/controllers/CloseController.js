import redis from '../../libs/redis';
import Station from '../schemas/Station';

class CloseController {
  async index(req, res) {
    try {
      const { radioId, genresIds } = req.params;
      let { page = 1 } = req.query;

      const cache = await redis.get(`close-${page}-${genresIds}-${radioId}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      let genresIdsFormatted = '';

      try {
        genresIdsFormatted = JSON.parse(genresIds);
      } catch (e) {}

      const currentPage = await redis.get(`close-page-${radioId}`);
      if (currentPage && !genresIdsFormatted.length) {
        page = Math.max(+currentPage % 104, 1);
      }

      const results = await Station.paginate(
        {
          genres: {
            $in: genresIdsFormatted.length ? genresIdsFormatted : [[]],
          },
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

      if (results?.items?.length) {
        await redis.set(
          `close-${page}-${genresIds}-${radioId}`,
          JSON.stringify(results),
          'EX',
          60 * 60 * cacheExpirationInHours
        );
      }

      await redis.set(`close-page-${radioId}`, +page + 1);

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new CloseController();
