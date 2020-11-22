import Station from '../schemas/Station';

class SearchController {
  async index(req, res) {
    try {
      const { q, page = 1 } = req.query;

      if (q.length < 3) {
        throw new Error();
      }

      const results = await Station.paginate(
        {
          countryCode: 'br',
          name: { $regex: q, $options: 'i' },
        },
        { page, select: '-frecuencies -programming', limit: 30 }
      );

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid search term.' });
    }
  }
}

export default new SearchController();
