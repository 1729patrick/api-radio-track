import Station from '../schemas/Station';

class LocationController {
  async index(req, res) {
    const { radioId, regionId, cityId } = req.params;
    const page = 1;

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

    if (!results.items.length) {
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

    return res.json(results);
  }
}

export default new LocationController();
