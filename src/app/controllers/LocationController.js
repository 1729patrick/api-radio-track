import redis from '../../libs/redis';
import Station from '../schemas/Station';

class LocationController {
  async index(req, res) {
    try {
      const { radioId, regionId, cityId } = req.params;
      const { countryCode = 'br' } = req;
      const page = 1;

      const cache = await redis.get(
        `location-${page}-${countryCode}-${regionId}-${cityId}-${radioId}`
      );
      if (cache) {
        return res.json(JSON.parse(cache));
      }
      let results = await Station.paginate(
        {
          countryCode,
          cityId,
          active: true,
          streams: { $ne: [] },
          id: { $ne: radioId },
        },
        {
          page,
          populate: ['city', 'region'],
        }
      );

      if (!results.items.length) {
        results = await Station.paginate(
          {
            countryCode,
            active: true,
            regionId,
            streams: { $ne: [] },
            id: { $ne: radioId },
          },
          {
            page,
            populate: ['city', 'region'],
          }
        );
      }

      results.items = results.items.sort(() => Math.random() - 0.5);

      if (results?.items?.length) {
        const cacheExpirationInHours = 1;
        await redis.set(
          `location-${page}-${countryCode}-${regionId}-${cityId}-${radioId}`,
          JSON.stringify(results),
          'EX',
          60 * 60 * cacheExpirationInHours
        );
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new LocationController();
