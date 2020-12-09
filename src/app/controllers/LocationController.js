import Station from '../schemas/Station';
import redis from '../../libs/redis';

class LocationController {
  async index(req, res) {
    const { radioId, countryCode, regionId, cityId } = req.params;
    const page = 1;

    const cache = await redis.get(
      `location-${page}-${radioId}-${countryCode}-${regionId}-${cityId}`
    );
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    let results = await Station.paginate(
      {
        countryCode: 'br',
        cityId,
        streams: { $ne: [] },
        id: { $ne: radioId },
      },
      {
        page,
        populate: 'city',
      }
    );

    if (!results.length) {
      results = await Station.paginate(
        {
          countryCode: 'br',
          regionId,
          streams: { $ne: [] },
          id: { $ne: radioId },
        },
        {
          page,
          populate: 'city',
        }
      );
    }

    results.items = results.items.sort(() => Math.random() - 0.5);

    await redis.set(
      `location-${page}-${radioId}-${countryCode}-${regionId}-${cityId}`,
      JSON.stringify(results)
    );

    return res.json(results);
  }
}

export default new LocationController();
