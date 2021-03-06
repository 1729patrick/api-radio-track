import mail from '../../libs/mail';
import redis from '../../libs/redis';
import Station from '../schemas/Station';

class StationController {
  async list(req, res) {
    try {
      let { page } = req.query;
      const { countryCode = 'br' } = req;
      page = Math.max(1, 1);

      const cache = await redis.get(`all-${countryCode}-${page}`);
      if (cache) {
        return res.json(JSON.parse(cache));
      }

      const results = await Station.paginate(
        { countryCode, active: true, streams: { $ne: [] } },
        { page, populate: ['city', 'region'] }
      );

      if (results?.items?.length) {
        await redis.set(`all-${countryCode}-${page}`, JSON.stringify(results));
      }

      return res.json(results);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async index(req, res) {
    try {
      const { id } = req.params;

      const result = await Station.find({ id });

      return res.json(result);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async create(req, res) {
    await mail.sendMail({
      to: '1729patrick@gmail.com',
      subject: 'Rádio API - New Radio',
      text: JSON.stringify(req.body),
    });
    return res.json(req.body);
  }
}

export default new StationController();
