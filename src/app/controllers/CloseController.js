import Station from '../schemas/Station';

class CloseController {
  async index(req, res) {
    const { radioId, genresIds } = req.params;
    const { page = 1 } = req.query;

    let genresIdsFormatted = '';

    try {
      genresIdsFormatted = JSON.parse(genresIds);
    } catch (e) {}

    const results = await Station.paginate(
      {
        genres: { $in: genresIdsFormatted.length ? genresIdsFormatted : [[]] },
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

    return res.json(results);
  }
}

export default new CloseController();
