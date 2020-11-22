import Station from '../schemas/Station';

class GenreController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const results = await Station.paginate(
      { genres: id, countryCode: 'br' },
      { page, select: '-frecuencies -programming' }
    );

    return res.json(results);
  }
}

export default new GenreController();
