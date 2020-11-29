import Station from '../schemas/Station';

class SearchController {
  async index(req, res) {
    try {
      const { q, page = 1 } = req.query;

      if (q.length < 3) {
        throw new Error();
      }

      const qNormalized = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const results = await Station.paginate(
        {
          countryCode: 'br',
          name: {
            $in: [new RegExp(q, 'i'), new RegExp(qNormalized, 'i')],
          },
        },
        {
          page,
          select: '-frecuencies -programming',
          limit: 30,
          populate: 'city',
        }
      );

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid search term.' });
    }
  }
}

export default new SearchController();
