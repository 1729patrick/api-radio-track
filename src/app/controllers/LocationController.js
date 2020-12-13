import redis from '../../libs/redis';
import Station from '../schemas/Station';

class LocationController {
  async index(req, res) {
    const { radioId, regionId, cityId } = req.params;
    const page = 1;

    const cache = await redis.get(
      `location-${page}-${'br'}-${regionId}-${cityId}-${radioId}`
    );
    if (cache) {
      return res.json(JSON.parse(cache));
    }
    let results = await Station.paginate(
      {
        countryCode: 'br',
        active: true,
        cityId,
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
          countryCode: 'br',
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

    const cacheExpirationInHours = 1;
    await redis.set(
      `location-${page}-${'br'}-${regionId}-${cityId}-${radioId}`,
      JSON.stringify(results),
      'EX',
      60 * 60 * cacheExpirationInHours
    );

    return res.json(results);
  }
}

export default new LocationController();
