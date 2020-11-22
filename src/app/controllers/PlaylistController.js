import Station from '../schemas/Station';

class PlaylistController {
  async random(req, res) {
    const randomPage = +(Math.random() * (3956 / 12)).toFixed(0);
    const { page = randomPage } = req.query;

    const results = await Station.paginate(
      { countryCode: 'br' },
      { page, select: '-frecuencies -programming' }
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
      }
    );

    return res.json(results);
  }

  async location(req, res) {
    const { page = 13 } = req.query;

    const results = await Station.paginate(
      { countryCode: 'br' },
      {
        page,
        select: '-frecuencies -programming',
      }
    );

    return res.json(results);
  }
}

export default new PlaylistController();
