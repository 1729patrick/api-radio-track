import Station from '../schemas/Station';

class StationController {
  async list(req, res) {
    const { page } = req.query;

    const results = await Station.paginate(
      { countryCode: 'br' },
      { page, select: '-frecuencies -programming' }
    );

    return res.json(results);
  }

  async index(req, res) {
    const { id } = req.params;

    const result = await Station.find({ id });

    return res.json(result);
  }
}

export default new StationController();
