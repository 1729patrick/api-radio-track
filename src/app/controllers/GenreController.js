import Station from '../schemas/Station';

class GenreController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    let genresIds = '';

    try {
      genresIds = JSON.parse(id);
    } catch (e) {}

    const results = await Station.paginate(
      { genres: { $in: genresIds }, countryCode: 'br' },
      { page, select: '-frecuencies -programming', populate: 'city' }
    );

    return res.json(results);
  }
}

export default new GenreController();
