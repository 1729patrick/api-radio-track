import Station from '../schemas/Station';

class PlaylistController {
  async random(req, res) {
    const { page = 1 } = req.query;

    const results = await Station.paginate(
      { countryCode: 'br' },
      {
        page,
        select: '-frecuencies -programming',
        populate: 'city',
      }
    );

    return res.json(results);
  }

  async popular(req, res) {
    const { page = 1 } = req.query;

    const results = await Station.paginate(
      { countryCode: 'br' },
      {
        page,
        select: '-frecuencies -programming',
        sort: { 'votes.up': 'desc' },
        populate: 'city',
      }
    );

    return res.json(results);
  }

  async location(req, res) {
    const { page = 1 } = req.query;

    const results = await Station.paginate(
      { countryCode: 'br' },
      {
        page,
        select: '-frecuencies -programming',
        populate: 'city',
      }
    );

    return res.json(results);
  }

  async recommend(req, res) {
    const { page = 1 } = req.query;

    const results = await Station.paginate(
      { countryCode: 'br' },
      {
        page,
        select: '-frecuencies -programming',
        populate: 'city',
      }
    );

    return res.json(results);
  }
}

export default new PlaylistController();
